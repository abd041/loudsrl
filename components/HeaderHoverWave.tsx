"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const FRAGMENT_SHADER = `
precision highp float;
varying vec2 vUv;
uniform float uTime;
uniform vec2 uResolution;
uniform float uProgress;
uniform float uActive;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

void main() {
  vec2 uv = vUv;
  vec2 p = uv * 2.0 - 1.0;
  p.x *= uResolution.x / uResolution.y;

  float t = uTime * 0.2;
  float wave = sin(p.x * 12.0 + t * 3.0 + p.y * 4.0);
  float line = smoothstep(0.94, 1.0, abs(wave)) * uActive;

  vec3 red = vec3(0.95, 0.02, 0.03);
  vec3 blue = vec3(0.05, 0.22, 1.0);
  vec3 color = mix(red, blue, uv.x + uProgress * 0.5);

  float alpha = line * uActive * 0.7;
  gl_FragColor = vec4(color * line, alpha);
}
`;

type HeaderHoverWaveProps = {
  active: boolean;
  progress?: number;
};

export default function HeaderHoverWave({
  active,
  progress = 0,
}: HeaderHoverWaveProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !active) return;

    const container = containerRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    const uniforms = {
      uTime: { value: 0 },
      uResolution: {
        value: new THREE.Vector2(container.clientWidth, container.clientHeight),
      },
      uProgress: { value: progress },
      uActive: { value: active ? 1 : 0 },
    };

    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = vec4(position.xy, 0.0, 1.0);
        }
      `,
      fragmentShader: FRAGMENT_SHADER,
      transparent: true,
    });

    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
    scene.add(mesh);

    const clock = new THREE.Clock();
    let frame = 0;

    const animate = () => {
      uniforms.uTime.value = clock.getElapsedTime();
      uniforms.uActive.value = active ? 1 : 0;
      uniforms.uProgress.value = progress;
      renderer.render(scene, camera);
      frame = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(frame);
      material.dispose();
      mesh.geometry.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [active, progress]);

  if (!active) return null;

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
    />
  );
}
