"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import {
  FOOTER_BACKDROP_TUNING,
  LIQUID_PRESETS,
  clampPresetIndex,
  type LiquidPreset,
} from "@/data/liquidPresets";
import LOUD_VERTEX_SHADER from "@/lib/shaders/loud-vertex.glsl";
import LOUD_FRAGMENT_SHADER from "@/lib/shaders/loud-fragment.glsl";
import { useAppStoreOptional } from "@/store/appStore";

function color4(hex: string): THREE.Vector4 {
  const c = new THREE.Color(hex);
  return new THREE.Vector4(c.r, c.g, c.b, 1);
}

function colorDistance(a: THREE.Vector4, b: THREE.Vector4) {
  const dr = a.x - b.x;
  const dg = a.y - b.y;
  const db = a.z - b.z;
  return Math.sqrt(dr * dr + dg * dg + db * db);
}

/** Match live R3F hero: fixed per-frame lerp at 60fps, framerate-normalized. */
function lerpAlpha(baseAlpha: number, dt: number) {
  return 1 - Math.pow(1 - baseAlpha, dt * 60);
}

function lerpNum(current: number, target: number, alpha: number) {
  return current + (target - current) * alpha;
}

function lerpVec4(
  current: THREE.Vector4,
  target: THREE.Vector4,
  alpha: number
) {
  current.x = lerpNum(current.x, target.x, alpha);
  current.y = lerpNum(current.y, target.y, alpha);
  current.z = lerpNum(current.z, target.z, alpha);
  current.w = lerpNum(current.w, target.w, alpha);
}

function presetHasZoom(preset: LiquidPreset) {
  return preset.zoom !== undefined;
}

type MorphState = {
  spinRotation: number;
  spinSpeed: number;
  contrast: number;
  lighting: number;
  spinAmount: number;
  pixelFilter: number;
  grainStrength: number;
  effectDepth: number;
  useGrain: number;
  colour1: THREE.Vector4;
  colour2: THREE.Vector4;
  colour3: THREE.Vector4;
};

function initMorphFromPreset(preset: LiquidPreset): MorphState {
  return {
    spinRotation: preset.spinRotation,
    spinSpeed: preset.spinSpeed,
    contrast: preset.contrast,
    lighting: preset.lighting,
    spinAmount: preset.spinAmount,
    pixelFilter: preset.pixelFilter,
    grainStrength: preset.grainStrength,
    effectDepth: preset.effectDepth,
    useGrain: preset.useGrain ? 1 : 0,
    colour1: color4(preset.colour1),
    colour2: color4(preset.colour2),
    colour3: color4(preset.colour3),
  };
}

function applyMorphToUniforms(
  uniforms: Record<string, { value: unknown }>,
  morph: MorphState,
  zoom: number
) {
  uniforms.spinRotation.value = morph.spinRotation;
  uniforms.spinSpeed.value = morph.spinSpeed;
  uniforms.contrast.value = morph.contrast;
  uniforms.lighting.value = morph.lighting;
  uniforms.spinAmount.value = morph.spinAmount;
  uniforms.pixelFilter.value = morph.pixelFilter;
  uniforms.grainStrength.value = morph.grainStrength;
  uniforms.effectDepth.value = morph.effectDepth;
  uniforms.useGrain.value = morph.useGrain;
  (uniforms.colour1.value as THREE.Vector4).copy(morph.colour1);
  (uniforms.colour2.value as THREE.Vector4).copy(morph.colour2);
  (uniforms.colour3.value as THREE.Vector4).copy(morph.colour3);
  uniforms.u_zoom.value = zoom;
}

export type LoudOriginalHeroProps = {
  activeIndex: number;
  preventZoomAnimation?: boolean;
  /** Fixed footer liquid — always animate, boosted contrast/grain. */
  footerBackdrop?: boolean;
  className?: string;
};

export default function LoudOriginalHero({
  activeIndex,
  preventZoomAnimation: preventZoomProp,
  footerBackdrop: footerBackdropProp,
  className = "",
}: LoudOriginalHeroProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const activeIndexRef = useRef(activeIndex);
  const preventZoomRef = useRef(preventZoomProp ?? false);
  const footerBackdropRef = useRef(footerBackdropProp ?? false);
  const store = useAppStoreOptional();
  const storeRef = useRef(store);
  const setIsReadyRef = useRef(store?.setIsReady);

  storeRef.current = store;
  activeIndexRef.current = activeIndex;
  preventZoomRef.current =
    preventZoomProp ?? store?.liquidBackground.preventZoomAnimation ?? false;
  footerBackdropRef.current = footerBackdropProp ?? false;
  setIsReadyRef.current = store?.setIsReady;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const homePreset = LIQUID_PRESETS[0];
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: false,
        antialias: true,
        powerPreference: "high-performance",
      });
    } catch {
      container.classList.add("bg-[#050505]");
      setIsReadyRef.current?.(true);
      return;
    }

    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setClearColor(0x000000, 1);

    const morph = initMorphFromPreset(homePreset);
    const targetColour1 = color4(homePreset.colour1);
    const targetColour2 = color4(homePreset.colour2);
    const targetColour3 = color4(homePreset.colour3);

    const uniforms: Record<string, { value: unknown }> = {
      iTime: { value: 0 },
      iResolution: { value: new THREE.Vector2(1, 1) },
      u_zoom: {
        value: footerBackdropRef.current
          ? FOOTER_BACKDROP_TUNING.zoom
          : preventZoomRef.current
            ? (homePreset.zoom ?? 4)
            : 100,
      },
      u_offset: { value: new THREE.Vector2(0, 0) },
      spinRotation: { value: morph.spinRotation },
      spinSpeed: { value: morph.spinSpeed },
      colour1: { value: morph.colour1.clone() },
      colour2: { value: morph.colour2.clone() },
      colour3: { value: morph.colour3.clone() },
      contrast: { value: morph.contrast },
      lighting: { value: morph.lighting },
      spinAmount: { value: morph.spinAmount },
      pixelFilter: { value: morph.pixelFilter },
      grainStrength: { value: morph.grainStrength },
      useGrain: { value: morph.useGrain },
      effectDepth: { value: morph.effectDepth },
    };

    const material = new THREE.ShaderMaterial({
      vertexShader: LOUD_VERTEX_SHADER,
      fragmentShader: LOUD_FRAGMENT_SHADER,
      uniforms: uniforms as THREE.ShaderMaterialParameters["uniforms"],
      depthTest: false,
      depthWrite: false,
    });

    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    renderer.domElement.style.cssText =
      "position:absolute;inset:0;width:100%;height:100%;display:block;";
    container.appendChild(renderer.domElement);

    const clock = new THREE.Clock();
    let frame = 0;

    const onContextLost = (event: Event) => {
      event.preventDefault();
      container.classList.add("bg-[#050505]");
      active = false;
      cancelAnimationFrame(frame);
    };
    renderer.domElement.addEventListener("webglcontextlost", onContextLost);
    let startTime: number | null = null;
    let currentZoom = footerBackdropRef.current
      ? FOOTER_BACKDROP_TUNING.zoom
      : preventZoomRef.current
        ? (homePreset.zoom ?? 4)
        : 100;
    let tabVisible = !document.hidden;
    let inView = true;
    let active = tabVisible && inView;
    let lastTime = 0;
    let isInit = true;
    const pointer = { x: 0.5, y: 0.5 };
    const offsetCurrent = new THREE.Vector2(0, 0);
    const offsetTarget = new THREE.Vector2(0, 0);
    const OFFSET_LERP = 0.08;
    const OFFSET_SCALE = 0.022;

    // Live chunk c20cbd4e: uniforms lerp at 0.09/frame, zoom uses 0.02 or 0.001
    // when preset has zoom, home return uses 0.05 (init) then 0.2.
    const UNIFORM_LERP = 0.09;
    const ZOOM_PRESET_LERP = 0.02;
    const ZOOM_PRESET_LERP_SLOW = 0.001;
    const ZOOM_HOME_INIT_LERP = 0.05;
    const ZOOM_HOME_LERP = 0.2;
    let lastPresetIndex = clampPresetIndex(activeIndexRef.current);

    const initTimer = window.setTimeout(() => {
      isInit = false;
    }, 2000);

    const setActive = () => {
      active = footerBackdropRef.current ? tabVisible : tabVisible && inView;
    };

    const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
    const maxDpr = isCoarsePointer ? 1.25 : 2;
    let resizeTimer: number | null = null;

    const resize = () => {
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      if (w === 0 || h === 0) return;
      const dpr = Math.min(window.devicePixelRatio || 1, maxDpr);

      renderer.setPixelRatio(dpr);
      renderer.setSize(w, h, false);
      (uniforms.iResolution.value as THREE.Vector2).set(w * dpr, h * dpr);
    };

    const scheduleResize = () => {
      if (resizeTimer !== null) window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        resizeTimer = null;
        resize();
        if (active) {
          lastTime = 0;
          render(1 / 60);
          renderer.render(scene, camera);
        }
      }, 120);
    };

    const isMorphing = (target: LiquidPreset, targetZoom: number) => {
      const colourEps = 0.008;
      return (
        Math.abs(morph.spinRotation - target.spinRotation) > 0.02 ||
        Math.abs(morph.spinSpeed - target.spinSpeed) > 0.02 ||
        Math.abs(morph.contrast - target.contrast) > 0.02 ||
        Math.abs(morph.lighting - target.lighting) > 0.02 ||
        Math.abs(morph.spinAmount - target.spinAmount) > 0.02 ||
        Math.abs(morph.pixelFilter - target.pixelFilter) > 25 ||
        Math.abs(morph.grainStrength - target.grainStrength) > 0.02 ||
        Math.abs(morph.effectDepth - target.effectDepth) > 0.05 ||
        Math.abs(morph.useGrain - (target.useGrain ? 1 : 0)) > 0.02 ||
        Math.abs(currentZoom - targetZoom) > 0.08 ||
        colorDistance(morph.colour1, targetColour1) > colourEps ||
        colorDistance(morph.colour2, targetColour2) > colourEps ||
        colorDistance(morph.colour3, targetColour3) > colourEps
      );
    };

    const footerTunedTarget = (preset: LiquidPreset): LiquidPreset => {
      if (!footerBackdropRef.current) return preset;
      const t = FOOTER_BACKDROP_TUNING;
      return {
        ...preset,
        contrast: preset.contrast * t.contrastMult,
        grainStrength: preset.useGrain
          ? Math.min(1, preset.grainStrength * t.grainMult)
          : preset.grainStrength,
        lighting: Math.min(0.55, preset.lighting + t.lightingAdd),
        spinAmount: preset.spinAmount * t.spinAmountMult,
      };
    };

    const updateUniforms = (dt: number) => {
      const idx = clampPresetIndex(activeIndexRef.current);
      const target = footerTunedTarget(LIQUID_PRESETS[idx] ?? LIQUID_PRESETS[0]);
      const targetZoom = footerBackdropRef.current
        ? FOOTER_BACKDROP_TUNING.zoom
        : (target.zoom ?? 4);

      targetColour1.copy(color4(target.colour1));
      targetColour2.copy(color4(target.colour2));
      targetColour3.copy(color4(target.colour3));

      if (prefersReduced) {
        Object.assign(morph, {
          spinRotation: target.spinRotation,
          spinSpeed: target.spinSpeed,
          contrast: target.contrast,
          lighting: target.lighting,
          spinAmount: target.spinAmount,
          pixelFilter: target.pixelFilter,
          grainStrength: target.grainStrength,
          effectDepth: target.effectDepth,
          useGrain: target.useGrain ? 1 : 0,
        });
        morph.colour1.copy(targetColour1);
        morph.colour2.copy(targetColour2);
        morph.colour3.copy(targetColour3);
        currentZoom = targetZoom;
      } else {
        const uniformAlpha = lerpAlpha(UNIFORM_LERP, dt);
        const useFastPresetZoom = Boolean(storeRef.current?.liquidBackground.zoom);

        morph.spinRotation = lerpNum(
          morph.spinRotation,
          target.spinRotation,
          uniformAlpha
        );
        morph.spinSpeed = lerpNum(morph.spinSpeed, target.spinSpeed, uniformAlpha);

        // Live snaps spinAmount when spinSpeed < 10 and target spinAmount < 1
        if (target.spinAmount < 1 && target.spinSpeed < 10) {
          morph.spinAmount = target.spinAmount;
        } else {
          morph.spinAmount = lerpNum(
            morph.spinAmount,
            target.spinAmount,
            uniformAlpha
          );
        }

        morph.contrast = lerpNum(morph.contrast, target.contrast, uniformAlpha);
        morph.lighting = lerpNum(morph.lighting, target.lighting, uniformAlpha);
        morph.grainStrength = lerpNum(
          morph.grainStrength,
          target.grainStrength,
          uniformAlpha
        );

        morph.effectDepth = target.effectDepth;
        morph.useGrain = target.useGrain ? 1 : 0;

        if (preventZoomRef.current) {
          morph.pixelFilter = target.pixelFilter;
        } else {
          morph.pixelFilter = lerpNum(
            morph.pixelFilter,
            target.pixelFilter,
            uniformAlpha
          );
        }

        lerpVec4(morph.colour1, targetColour1, uniformAlpha);
        lerpVec4(morph.colour2, targetColour2, uniformAlpha);
        lerpVec4(morph.colour3, targetColour3, uniformAlpha);

        if (!preventZoomRef.current) {
          if (presetHasZoom(target)) {
            const zoomAlpha = lerpAlpha(
              useFastPresetZoom ? ZOOM_PRESET_LERP : ZOOM_PRESET_LERP_SLOW,
              dt
            );
            currentZoom = lerpNum(currentZoom, targetZoom, zoomAlpha);
          } else {
            const zoomAlpha = lerpAlpha(
              isInit ? ZOOM_HOME_INIT_LERP : ZOOM_HOME_LERP,
              dt
            );
            currentZoom = lerpNum(currentZoom, homePreset.zoom ?? 4, zoomAlpha);
          }
        } else if (footerBackdropRef.current) {
          currentZoom = FOOTER_BACKDROP_TUNING.zoom;
        } else {
          currentZoom = targetZoom;
        }
      }

      offsetTarget.set(
        (pointer.x - 0.5) * OFFSET_SCALE,
        (pointer.y - 0.5) * -OFFSET_SCALE
      );
      const offsetAlpha = lerpAlpha(OFFSET_LERP, dt);
      offsetCurrent.x = lerpNum(offsetCurrent.x, offsetTarget.x, offsetAlpha);
      offsetCurrent.y = lerpNum(offsetCurrent.y, offsetTarget.y, offsetAlpha);
      (uniforms.u_offset.value as THREE.Vector2).copy(offsetCurrent);

      applyMorphToUniforms(uniforms, morph, currentZoom);
      return isMorphing(target, targetZoom);
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!active || isCoarsePointer) return;
      const rect = container.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      pointer.x = (event.clientX - rect.left) / rect.width;
      pointer.y = (event.clientY - rect.top) / rect.height;
    };

    const render = (dt: number) => {
      const elapsed = clock.getElapsedTime();
      const idx = clampPresetIndex(activeIndexRef.current);

      // Live R3F hero resets iTime whenever the preset config changes — this
      // restarts the warp loop and makes blocky presets blink on entry.
      if (idx !== lastPresetIndex) {
        startTime = elapsed;
        lastPresetIndex = idx;
      }
      if (startTime === null) startTime = elapsed;

      uniforms.iTime.value = elapsed - startTime;
      return updateUniforms(dt);
    };

    const animate = (time: number) => {
      frame = requestAnimationFrame(animate);
      if (!active) return;

      const dt = lastTime ? Math.min((time - lastTime) / 1000, 0.05) : 1 / 60;
      lastTime = time;

      render(dt);
      renderer.render(scene, camera);
    };

    const onVisibility = () => {
      tabVisible = !document.hidden;
      setActive();
      if (active) {
        lastTime = 0;
        render(1 / 60);
        renderer.render(scene, camera);
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        setActive();
        if (active) {
          lastTime = 0;
          render(1 / 60);
          renderer.render(scene, camera);
        }
      },
      { threshold: 0 }
    );

    resize();
    render(1 / 60);
    renderer.render(scene, camera);
    setIsReadyRef.current?.(true);

    if (!prefersReduced) {
      if (!footerBackdropRef.current) {
        observer.observe(container);
      }
      lastTime = performance.now();
      frame = requestAnimationFrame(animate);
    }

    window.addEventListener("resize", scheduleResize, { passive: true });
    if (!isCoarsePointer) {
      window.addEventListener("pointermove", onPointerMove, { passive: true });
    }
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      clearTimeout(initTimer);
      if (resizeTimer !== null) window.clearTimeout(resizeTimer);
      cancelAnimationFrame(frame);
      observer.disconnect();
      renderer.domElement.removeEventListener("webglcontextlost", onContextLost);
      window.removeEventListener("resize", scheduleResize);
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("visibilitychange", onVisibility);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      renderer.domElement.remove();
      setIsReadyRef.current?.(false);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 z-0 h-full w-full overflow-hidden bg-black ${className}`}
      aria-hidden="true"
    />
  );
}
