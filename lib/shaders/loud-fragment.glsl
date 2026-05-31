precision highp float;

uniform float iTime;
uniform vec2 iResolution;
uniform float u_zoom;
uniform vec2 u_offset;

uniform float spinRotation;
uniform float spinSpeed;
uniform vec4 colour1;
uniform vec4 colour2;
uniform vec4 colour3;
uniform float contrast;
uniform float lighting;
uniform float spinAmount;
uniform float pixelFilter;
uniform float grainStrength;
uniform float useGrain;
uniform float effectDepth;

varying vec2 vUv;

float random(in vec2 st) {
  return fract(sin(dot(st, vec2(12.9898, 78.233))) * 43758.5453123);
}

vec4 effect(vec2 screenSize, vec2 screen_coords) {
  vec2 center = 0.5 * screenSize;
  float base_pixel = length(screenSize) / pixelFilter;
  float pixel_size = base_pixel / u_zoom;
  vec2 grid_uv = floor((screen_coords - center) / base_pixel) * base_pixel + center;

  vec2 uv0 = (grid_uv - center) / screenSize.y;
  uv0 /= u_zoom;
  uv0 += u_offset;

  float uv_len = length(uv0);
  float timeOffset = iTime;
  float speed = spinRotation * 0.2;
  speed = timeOffset * speed;
  speed += 302.2;
  float angle = atan(uv0.y, uv0.x) + speed - 20.0 * (spinAmount * uv_len + (1.0 - spinAmount));

  vec2 mid = 0.5 * (screenSize / length(screenSize));
  vec2 uv = vec2(
    uv_len * cos(angle) + mid.x,
    uv_len * sin(angle) + mid.y
  ) - mid;

  uv *= 20.0;

  speed = timeOffset * spinSpeed;
  vec2 uv2 = vec2(uv.x + uv.y);
  for (int i = 0; i < 20; i++) {
    if (float(i) >= effectDepth) break;
    uv2 += sin(max(uv.x, uv.y)) + uv;
    uv += 0.5 * vec2(
      cos(5.1123314 + 0.353 * uv2.y + speed * 0.131121),
      sin(uv2.x - 0.113 * speed)
    );
    uv -= cos(uv.x + uv.y) - sin(0.711 * uv.x - uv.y);
  }

  float contrast_mod = (0.25 * contrast + 0.5 * spinAmount + 1.2);
  float paint_res = clamp(length(uv) * 0.035 * contrast_mod, 0.0, 2.0);
  float c1p = max(0.0, 1.0 - contrast_mod * abs(1.0 - paint_res));
  float c2p = max(0.0, 1.0 - contrast_mod * abs(paint_res));
  float c3p = 1.0 - min(1.0, c1p + c2p);
  float light = (lighting - 0.2) * max(c1p * 5.0 - 4.0, 0.0)
              + lighting * max(c2p * 5.0 - 4.0, 0.0);

  vec4 baseColor = (0.3 / contrast) * colour1
                 + (1.0 - 0.3 / contrast) * (
                     colour1 * c1p
                   + colour2 * c2p
                   + vec4(colour3.rgb * c3p, colour1.a * c3p)
                   ) + light;

  float grain_noise = random(gl_FragCoord.xy + timeOffset);
  baseColor.rgb += (useGrain > 0.5 ? grainStrength : 0.0) * (grain_noise - 0.5);

  return baseColor;
}

void main() {
  gl_FragColor = effect(iResolution.xy, gl_FragCoord.xy);
}
