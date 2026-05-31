"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import { LIQUID_TEXTURE_PATH } from "@/lib/generateLiquidMarbleTexture";
import { createDisplacementTexture } from "@/lib/createDisplacementTexture";

// Multi-layer texture flow: base liquid + displacement advection + ridge highlights.
const FRAGMENT_SHADER = `
precision highp float;

varying vec2 vUv;

uniform sampler2D uTexture;
uniform sampler2D uDispTexture;
uniform float uTime;
uniform vec2 uResolution;
uniform vec2 uMouse;
uniform float uSpeed;
uniform float uDispStrength;
uniform float uMacroMotion;
uniform float uMicroMotion;
uniform float uDetailMotion;
uniform float uRidgeStr;
uniform float uContrast;
uniform float uBrightness;
uniform float uVignette;
uniform vec2 uTextureScale;
uniform vec2 uTextureOffset;
uniform float uDebugRaw;

vec2 cropUv(vec2 uv) {
  return (uv - 0.5) / uTextureScale + 0.5 + uTextureOffset;
}

void main() {
  vec2 uv = vUv;

  if (uDebugRaw > 0.5) {
    gl_FragColor = vec4(texture2D(uTexture, cropUv(uv)).rgb, 1.0);
    return;
  }

  float t = uTime * uSpeed;
  vec2 mouse = (uMouse - 0.5) * 0.025;

  // Independent motion scales: slow folds / medium slide / fast shimmer
  float tMacro  = t * uMacroMotion * 0.35;
  float tMicro  = t * uMicroMotion;
  float tDetail = t * uDetailMotion * 2.2;

  // Displacement field sampled at 3 frequencies — tileable, animated
  vec2 dispA = texture2D(uDispTexture, uv * 0.70 + vec2( tMacro * 0.09, -tMacro * 0.05)).rg - 0.5;
  vec2 dispB = texture2D(uDispTexture, uv * 1.80 + vec2(-tMicro * 0.14,  tMicro * 0.10)).rg - 0.5;
  vec2 dispC = texture2D(uDispTexture, uv * 3.60 + vec2( tDetail * 0.22,  tDetail * 0.16)).rg - 0.5;

  float str = uDispStrength;

  // Composition bias — pull strongest structure toward hero center
  vec2 heroCenter = vec2(0.50, 0.48);
  float centerW = 1.0 - smoothstep(0.0, 0.85, length(uv - heroCenter));
  vec2 compBias = (heroCenter - uv) * centerW * 0.018;

  vec2 baseUv = cropUv(uv) + compBias + mouse;

  // Three independent sample coordinates — parallax-like liquid depth
  vec2 uvA = baseUv + dispA * str * 0.080;
  vec2 uvB = baseUv + dispA * str * 0.040 + dispB * str * 0.032;
  vec2 uvC = baseUv + dispA * str * 0.018 + dispC * str * 0.014;

  // Slow global drift — separate from displacement
  uvA.x += sin(tMacro * 0.55) * 0.008;
  uvA.y += cos(tMacro * 0.42) * 0.006;
  uvB.x += sin(tMicro * 0.80 + 1.2) * 0.005;
  uvC.y += cos(tDetail * 1.10 + 0.7) * 0.004;

  vec3 baseA = texture2D(uTexture, uvA).rgb;
  vec3 baseB = texture2D(uTexture, uvB).rgb;
  vec3 baseC = texture2D(uTexture, uvC).rgb;

  vec3 color = baseA * 0.52 + baseB * 0.33 + baseC * 0.15;

  // Ridge / gloss extraction from luminance + inter-layer contrast
  float lumA = dot(baseA, vec3(0.299, 0.587, 0.114));
  float lumB = dot(baseB, vec3(0.299, 0.587, 0.114));
  float lumC = dot(baseC, vec3(0.299, 0.587, 0.114));
  float lum  = dot(color, vec3(0.299, 0.587, 0.114));

  float detailContrast = length(baseC - baseA) + abs(lumB - lumA) * 0.5;
  float ridge = smoothstep(0.14, 0.48, lum) * (1.0 - smoothstep(0.55, 0.92, lum));
  ridge += detailContrast * 0.85;
  ridge *= uRidgeStr;

  color += vec3(0.10, 0.10, 0.14) * ridge * 0.55;
  color += vec3(0.22, 0.22, 0.28) * pow(ridge, 2.0) * 0.35;

  // Shimmer on fine detail layer
  float shimmer = sin(tDetail * 3.5 + lumC * 18.0) * 0.5 + 0.5;
  color += vec3(0.06, 0.06, 0.09) * shimmer * detailContrast * uRidgeStr * 0.18;

  // Levels / tone
  float blackPoint = 0.004;
  float whitePoint = 0.46;
  color = max(color - blackPoint, 0.0) / max(whitePoint - blackPoint, 0.001);
  color = pow(max(color, 0.0), vec3(uContrast));
  color *= uBrightness;
  color *= vec3(1.02, 1.02, 1.08);

  float mid = smoothstep(0.025, 0.22, lum);
  float hi  = smoothstep(0.12, 0.55, lum);
  color += vec3(0.045, 0.045, 0.070) * mid * 0.65;
  color += vec3(0.12, 0.12, 0.16) * hi * 0.28;

  vec2 vc = uv - 0.5;
  float vig = 1.0 - dot(vc, vc) * uVignette;
  color *= vig;

  gl_FragColor = vec4(color, 1.0);
}
`;

const VERTEX_SHADER = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`;

export type ShaderControls = {
  speed:           number;
  dispStrength:    number;
  macroMotion:     number;
  microMotion:     number;
  detailMotion:    number;
  ridgeStr:        number;
  contrast:        number;
  brightness:      number;
  vignette:        number;
  textureScaleX:   number;
  textureScaleY:   number;
  textureOffsetX:  number;
  textureOffsetY:  number;
};

const DEFAULTS: ShaderControls = {
  speed:           0.45,
  dispStrength:    1.0,
  macroMotion:     1.0,
  microMotion:     1.4,
  detailMotion:    2.2,
  ridgeStr:        0.35,
  contrast:        0.78,
  brightness:      2.15,
  vignette:        0.04,
  textureScaleX:   1.25,
  textureScaleY:   1.18,
  textureOffsetX:  0.00,
  textureOffsetY:  0.02,
};

type ThreeLiquidHeroProps = {
  className?:    string;
  showControls?: boolean;
  textureUrl?:   string;
};

export default function ThreeLiquidHeroExperiment({
  className    = "",
  showControls = false,
  textureUrl   = LIQUID_TEXTURE_PATH,
}: ThreeLiquidHeroProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const uniformsRef  = useRef<Record<string, { value: unknown }> | null>(null);
  const textureRef   = useRef<THREE.Texture | null>(null);
  const dispRef      = useRef<THREE.Texture | null>(null);

  const [ctrl, setCtrl] = useState<ShaderControls>(DEFAULTS);
  const [open, setOpen] = useState(true);
  const [debugRaw, setDebugRaw] = useState(false);
  const [textureSource, setTextureSource] = useState<"loading" | "file" | "error">("loading");

  const syncUniforms = useCallback((c: ShaderControls) => {
    const u = uniformsRef.current;
    if (!u) return;
    u.uSpeed.value         = c.speed;
    u.uDispStrength.value  = c.dispStrength;
    u.uMacroMotion.value   = c.macroMotion;
    u.uMicroMotion.value   = c.microMotion;
    u.uDetailMotion.value  = c.detailMotion;
    u.uRidgeStr.value      = c.ridgeStr;
    u.uContrast.value      = c.contrast;
    u.uBrightness.value    = c.brightness;
    u.uVignette.value      = c.vignette;
    (u.uTextureScale.value as THREE.Vector2).set(c.textureScaleX, c.textureScaleY);
    (u.uTextureOffset.value as THREE.Vector2).set(c.textureOffsetX, c.textureOffsetY);
  }, []);

  useEffect(() => {
    const u = uniformsRef.current;
    if (u) u.uDebugRaw.value = debugRaw ? 1 : 0;
  }, [debugRaw]);

  useEffect(() => { syncUniforms(ctrl); }, [ctrl, syncUniforms]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const scene    = new THREE.Scene();
    const camera   = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const renderer = new THREE.WebGLRenderer({
      alpha: false,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setClearColor(0x000000, 1);

    let disposed = false;

    const dispTexture = createDisplacementTexture(512);
    dispRef.current = dispTexture;

    const uniforms: Record<string, { value: unknown }> = {
      uTexture:       { value: null as THREE.Texture | null },
      uDispTexture:   { value: dispTexture },
      uTime:          { value: 0 },
      uResolution:    { value: new THREE.Vector2(1, 1) },
      uMouse:         { value: new THREE.Vector2(0.5, 0.5) },
      uSpeed:         { value: DEFAULTS.speed },
      uDispStrength:  { value: DEFAULTS.dispStrength },
      uMacroMotion:   { value: DEFAULTS.macroMotion },
      uMicroMotion:   { value: DEFAULTS.microMotion },
      uDetailMotion:  { value: DEFAULTS.detailMotion },
      uRidgeStr:      { value: DEFAULTS.ridgeStr },
      uContrast:      { value: DEFAULTS.contrast },
      uBrightness:    { value: DEFAULTS.brightness },
      uVignette:      { value: DEFAULTS.vignette },
      uTextureScale:  { value: new THREE.Vector2(DEFAULTS.textureScaleX, DEFAULTS.textureScaleY) },
      uTextureOffset: { value: new THREE.Vector2(DEFAULTS.textureOffsetX, DEFAULTS.textureOffsetY) },
      uDebugRaw:      { value: 0 },
    };

    uniformsRef.current = uniforms;

    const applyTexture = (tex: THREE.Texture) => {
      if (disposed) {
        tex.dispose();
        return;
      }
      textureRef.current?.dispose();
      textureRef.current = tex;
      uniforms.uTexture.value = tex;
    };

    const material = new THREE.ShaderMaterial({
      uniforms: uniforms as THREE.ShaderMaterialParameters["uniforms"],
      vertexShader:   VERTEX_SHADER,
      fragmentShader: FRAGMENT_SHADER,
    });

    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
    scene.add(mesh);

    renderer.domElement.style.cssText =
      "position:absolute;inset:0;width:100%;height:100%;display:block;";
    container.appendChild(renderer.domElement);

    const clock    = new THREE.Clock();
    const mouse    = new THREE.Vector2(0.5, 0.5);
    let frame      = 0;
    let tabVisible = !document.hidden;
    let inView     = true;
    let active     = tabVisible && inView;
    let lastFrame  = 0;
    const frameInterval = 1000 / 30;

    const setActive = () => { active = tabVisible && inView; };

    const resize = () => {
      const w = container.clientWidth  || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      if (w === 0 || h === 0) return;
      const dpr = window.devicePixelRatio || 1;
      renderer.setPixelRatio(dpr);
      renderer.setSize(w, h, false);
      (uniforms.uResolution.value as THREE.Vector2).set(w * dpr, h * dpr);
    };

    const render = () => {
      uniforms.uTime.value = clock.getElapsedTime();
      (uniforms.uMouse.value as THREE.Vector2).copy(mouse);
      renderer.render(scene, camera);
    };

    const loader = new THREE.TextureLoader();
    loader.load(
      textureUrl,
      (tex) => {
        if (disposed) {
          tex.dispose();
          return;
        }
        tex.wrapS = THREE.ClampToEdgeWrapping;
        tex.wrapT = THREE.ClampToEdgeWrapping;
        tex.minFilter = THREE.LinearFilter;
        tex.magFilter = THREE.LinearFilter;
        tex.colorSpace = THREE.SRGBColorSpace;
        tex.needsUpdate = true;
        applyTexture(tex);
        setTextureSource("file");
        render();
      },
      undefined,
      (error) => {
        console.error("Liquid texture failed to load:", textureUrl, error);
        if (!disposed) setTextureSource("error");
      }
    );

    const animate = (time: number) => {
      frame = requestAnimationFrame(animate);
      if (!active) return;
      if (time - lastFrame < frameInterval) return;
      lastFrame = time;
      render();
    };

    const onPointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      if (rect.width === 0) return;
      mouse.set(
        (e.clientX - rect.left) / rect.width,
        1 - (e.clientY - rect.top) / rect.height,
      );
    };

    const onVisibility = () => {
      tabVisible = !document.hidden;
      setActive();
      if (active) render();
    };

    const observer = new IntersectionObserver(
      ([entry]) => { inView = entry.isIntersecting; setActive(); if (active) render(); },
      { threshold: 0 },
    );

    resize();
    render();

    if (!prefersReduced) {
      observer.observe(container);
      frame = requestAnimationFrame(animate);
    }

    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("visibilitychange", onVisibility);
      mesh.geometry.dispose();
      material.dispose();
      textureRef.current?.dispose();
      dispRef.current?.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [textureUrl]);

  const set = (key: keyof ShaderControls, value: number) =>
    setCtrl((p) => ({ ...p, [key]: value }));

  const Slider = ({
    label, k, min, max, step,
  }: { label: string; k: keyof ShaderControls; min: number; max: number; step: number }) => (
    <label className="flex flex-col gap-0.5">
      <span className="flex justify-between text-[10px] opacity-60">
        <span>{label}</span>
        <span>{ctrl[k].toFixed(3)}</span>
      </span>
      <input
        type="range" min={min} max={max} step={step}
        value={ctrl[k]}
        onChange={(e) => set(k, parseFloat(e.target.value))}
        className="w-full accent-white h-1 cursor-pointer"
      />
    </label>
  );

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 z-0 h-full w-full ${className}`}
      aria-hidden={!showControls}
    >
      {showControls && (
        <div
          className="absolute top-16 right-4 z-50 w-64 rounded-lg border border-white/10 bg-black/85 backdrop-blur-md text-white text-xs shadow-2xl max-h-[85vh] overflow-y-auto"
          style={{ fontFamily: "monospace" }}
        >
          <div
            className="flex items-center justify-between px-3 py-2 border-b border-white/10 cursor-pointer select-none sticky top-0 bg-black/85"
            onClick={() => setOpen((o) => !o)}
          >
            <span className="font-bold tracking-widest text-[10px] opacity-80">LIQUID SHADER</span>
            <span className="text-[10px] opacity-50">{open ? "▲" : "▼"}</span>
          </div>

          {open && (
            <div className="flex flex-col gap-3 p-3">
              <p className={`text-[9px] leading-relaxed ${
                textureSource === "file" ? "text-green-400/70" :
                textureSource === "error" ? "text-red-400/80" :
                "text-white/40"
              }`}>
                Texture:{" "}
                {textureSource === "loading" && "loading…"}
                {textureSource === "file" && textureUrl}
                {textureSource === "error" && `FAILED — check ${textureUrl}`}
              </p>

              <div className="flex flex-col gap-2">
                <span className="text-[9px] opacity-40 uppercase tracking-widest">Motion layers</span>
                <Slider label="Speed"         k="speed"        min={0.05} max={1.2} step={0.01} />
                <Slider label="Disp strength" k="dispStrength" min={0.2}  max={2.5} step={0.05} />
                <Slider label="Macro (folds)" k="macroMotion"  min={0.2}  max={2.5} step={0.05} />
                <Slider label="Micro (slide)" k="microMotion"  min={0.2}  max={3.0} step={0.05} />
                <Slider label="Detail (shim)" k="detailMotion" min={0.5}  max={4.0} step={0.05} />
                <Slider label="Ridge gloss"   k="ridgeStr"     min={0.0}  max={1.0} step={0.01} />
              </div>

              <div className="border-t border-white/10 pt-2 flex flex-col gap-2">
                <span className="text-[9px] opacity-40 uppercase tracking-widest">Tone</span>
                <Slider label="Brightness" k="brightness" min={0.4} max={3.0} step={0.01} />
                <Slider label="Contrast"   k="contrast"   min={0.5} max={1.2} step={0.01} />
                <Slider label="Vignette"   k="vignette"   min={0.0} max={0.3} step={0.01} />
              </div>

              <label className="flex items-center gap-2 text-[10px] opacity-60 cursor-pointer">
                <input
                  type="checkbox"
                  checked={debugRaw}
                  onChange={(e) => setDebugRaw(e.target.checked)}
                  className="accent-white"
                />
                Raw texture debug
              </label>

              <div className="border-t border-white/10 pt-2 flex flex-col gap-2">
                <span className="text-[9px] opacity-40 uppercase tracking-widest">
                  Crop (scale &gt; 1 = zoom in)
                </span>
                <Slider label="Scale X"   k="textureScaleX"  min={0.8} max={2.0} step={0.01} />
                <Slider label="Scale Y"   k="textureScaleY"  min={0.8} max={2.0} step={0.01} />
                <Slider label="Offset X"  k="textureOffsetX" min={-0.3} max={0.3} step={0.01} />
                <Slider label="Offset Y"  k="textureOffsetY" min={-0.3} max={0.3} step={0.01} />
              </div>

              <button
                className="text-[9px] opacity-40 hover:opacity-80 text-left transition-opacity"
                onClick={() => navigator.clipboard.writeText(JSON.stringify(ctrl, null, 2))}
              >
                📋 copy values as JSON
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
