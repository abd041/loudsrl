import * as THREE from "three";

/** Classic 2D value noise for baking a marble base texture. */
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

function fbm2(x: number, y: number, octaves = 6): number {
  let v = 0;
  let a = 0.5;
  let freq = 1;
  for (let i = 0; i < octaves; i++) {
    v += a * smoothNoise(x * freq, y * freq);
    freq *= 2.05;
    a *= 0.48;
  }
  return v;
}

/**
 * Bakes a high-detail dark liquid-marble image for the hero shader.
 * Replace with `/media/loud-liquid-base.jpg` from the original asset when available.
 */
export function createLiquidMarbleTexture(size = 1024): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not create marble texture canvas");

  const img = ctx.createImageData(size, size);
  const data = img.data;

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const u = x / size;
      const v = y / size;

      // domain warp for organic folds
      const wx = u * 2.8;
      const wy = v * 2.8;
      const warpX = fbm2(wx + 1.7, wy + 0.4, 4);
      const warpY = fbm2(wx + 4.2, wy + 2.1, 4);
      const px = wx + (warpX - 0.5) * 1.6;
      const py = wy + (warpY - 0.5) * 1.6;

      const n = fbm2(px, py, 6);
      const n2 = fbm2(px * 1.8 + n, py * 1.8 - n, 4);

      // marble veins
      const vein = Math.sin((px + n * 2.2) * 9.5 + n2 * 4.0);
      const fine = Math.sin((py + n2 * 1.4) * 22.0 + n * 6.0);
      const fold = Math.pow(Math.abs(vein), 0.55) * 0.65 + Math.pow(Math.abs(fine), 3.2) * 0.12;

      // dark oil palette: black troughs, grey-blue body, silver ridges
      const trough = Math.pow(1.0 - fold, 2.8);
      const ridge = Math.pow(fold, 4.5);

      let r = trough * 2 + ridge * 185 + n * 18;
      let g = trough * 3 + ridge * 182 + n * 20;
      let b = trough * 8 + ridge * 210 + n * 28;

      // subtle purple-blue tint in midtones
      const mid = Math.max(0, 1.0 - Math.abs(vein) * 2.5);
      r += mid * 12;
      g += mid * 8;
      b += mid * 22;

      const i = (y * size + x) * 4;
      data[i]     = Math.min(255, r);
      data[i + 1] = Math.min(255, g);
      data[i + 2] = Math.min(255, b);
      data[i + 3] = 255;
    }
  }

  ctx.putImageData(img, 0, 0);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
}

export const LIQUID_TEXTURE_PATH = "/media/loud-liquid-base.jpg";
