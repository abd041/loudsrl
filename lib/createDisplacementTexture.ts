import * as THREE from "three";

function hash2(x: number, y: number): number {
  return Math.abs(Math.sin(x * 127.1 + y * 311.7) * 43758.5453) % 1;
}

function smoothNoise(x: number, y: number): number {
  const ix = Math.floor(x);
  const iy = Math.floor(y);
  const fx = x - ix;
  const fy = y - iy;
  const ux = fx * fx * (3 - 2 * fx);
  const uy = fy * fy * (3 - 2 * fy);
  const a = hash2(ix, iy);
  const b = hash2(ix + 1, iy);
  const c = hash2(ix, iy + 1);
  const d = hash2(ix + 1, iy + 1);
  return a + (b - a) * ux + (c - a) * uy + (a - b - c + d) * ux * uy;
}

function fbm2(x: number, y: number, octaves = 5): number {
  let v = 0;
  let a = 0.5;
  let freq = 1;
  for (let i = 0; i < octaves; i++) {
    v += a * smoothNoise(x * freq, y * freq);
    freq *= 2.03;
    a *= 0.5;
  }
  return v;
}

/** Tileable RG displacement field (values centered at 0.5). */
export function createDisplacementTexture(size = 512): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not create displacement texture canvas");

  const img = ctx.createImageData(size, size);
  const data = img.data;

  for (let y = 0; y < size; y++) {
    for (let yNorm = y / size, x = 0; x < size; x++) {
      const xNorm = x / size;
      const n1 = fbm2(xNorm * 4.0, yNorm * 4.0, 5);
      const n2 = fbm2(xNorm * 4.0 + 3.7, yNorm * 4.0 + 1.9, 5);
      const n3 = fbm2(xNorm * 8.0 + n1 * 2.0, yNorm * 8.0 + n2 * 2.0, 3);

      const r = Math.floor((n1 * 0.65 + n3 * 0.35) * 255);
      const g = Math.floor((n2 * 0.65 + n3 * 0.35) * 255);
      const i = (y * size + x) * 4;
      data[i]     = r;
      data[i + 1] = g;
      data[i + 2] = Math.floor(fbm2(xNorm * 2.0, yNorm * 2.0, 4) * 255);
      data[i + 3] = 255;
    }
  }

  ctx.putImageData(img, 0, 0);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.needsUpdate = true;
  return texture;
}
