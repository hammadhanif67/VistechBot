/**
 * Builds `public/og-image.jpg` — the 1200x630 card social platforms and search
 * previews show for every route.
 *
 * Rendered from an inline SVG so the mark, palette and type treatment stay in
 * sync with the site's own tokens rather than being a hand-exported asset that
 * quietly drifts. Same rules as the site: hard rectangles, no radius, no grid.
 *
 * Run with:  npm run generate:og
 */
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT = path.join(root, "public");

const WIDTH = 1200;
const HEIGHT = 630;

/** Mirrors LAYER_PLAN in src/components/three/sceneGeometry.js. */
const LAYERS = [
  { y: 132, count: 7, spread: 250 },
  { y: 226, count: 5, spread: 186 },
  { y: 320, count: 4, spread: 130 },
  { y: 414, count: 2, spread: 66 },
  { y: 500, count: 1, spread: 0 },
];

const CX = 930;

const points = LAYERS.map(({ y, count, spread }) => {
  if (count === 1) return [{ x: CX, y }];
  const step = spread / (count - 1);
  return Array.from({ length: count }, (_, i) => ({ x: CX - spread / 2 + step * i, y }));
});

const edges = points.flatMap((layer, index) => {
  const next = points[index + 1];
  if (!next) return [];

  return layer.flatMap((from) =>
    [...next]
      .sort((a, b) => Math.abs(a.x - from.x) - Math.abs(b.x - from.x))
      .slice(0, 2)
      .map((to) => `<line x1="${from.x}" y1="${from.y}" x2="${to.x}" y2="${to.y}"/>`)
  );
});

const nodes = points.flatMap((layer, index) => {
  const t = index / (LAYERS.length - 1);
  const size = 9 + t * 8;

  return layer.map(
    (p) =>
      `<rect x="${p.x - size / 2}" y="${p.y - size / 2}" width="${size}" height="${size}" ` +
      `fill="${index === LAYERS.length - 1 ? "#19e0ff" : "#2f6bff"}" fill-opacity="${(0.5 + t * 0.5).toFixed(2)}"/>`
  );
});

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
  <defs>
    <radialGradient id="glowA" cx="0.8" cy="0.1" r="0.7">
      <stop offset="0%" stop-color="#2f6bff" stop-opacity="0.3"/>
      <stop offset="100%" stop-color="#2f6bff" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glowB" cx="0.05" cy="0.85" r="0.6">
      <stop offset="0%" stop-color="#8b4dff" stop-opacity="0.22"/>
      <stop offset="100%" stop-color="#8b4dff" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="${WIDTH}" height="${HEIGHT}" fill="#05070f"/>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#glowA)"/>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#glowB)"/>

  <!-- Neural lattice: many inputs converging on one output. -->
  <g stroke="#2f6bff" stroke-opacity="0.3" stroke-width="1">${edges.join("")}</g>
  <g>${nodes.join("")}</g>
  <rect x="815" y="118" width="230" height="28" fill="none" stroke="#19e0ff" stroke-opacity="0.18"/>
  <rect x="857" y="306" width="146" height="28" fill="none" stroke="#19e0ff" stroke-opacity="0.18"/>

  <!-- Mark -->
  <g transform="translate(72, 64) scale(1.5)">
    <path d="M4 4 L16 27 L28 4" stroke="#ffffff" stroke-width="3" fill="none" stroke-linecap="butt" stroke-linejoin="miter"/>
  </g>
  <text x="140" y="95" font-family="Urbanist, 'Segoe UI', Helvetica, Arial, sans-serif" font-size="34" font-weight="800" fill="#ffffff" letter-spacing="-1.4">Vistech<tspan font-weight="300" fill="#9aa4c4">Bot</tspan></text>

  <!-- Statement -->
  <text x="72" y="290" font-family="Urbanist, 'Segoe UI', Helvetica, Arial, sans-serif" font-size="74" font-weight="800" fill="#ffffff" letter-spacing="-3.4">ANSWER EVERY</text>
  <text x="72" y="366" font-family="Urbanist, 'Segoe UI', Helvetica, Arial, sans-serif" font-size="74" font-weight="800" fill="#ffffff" letter-spacing="-3.4">CUSTOMER</text>
  <text x="72" y="442" font-family="Urbanist, 'Segoe UI', Helvetica, Arial, sans-serif" font-size="74" font-weight="300" fill="#19e0ff" letter-spacing="-3.4">INSTANTLY.</text>

  <!-- Footer rule and metadata -->
  <rect x="72" y="512" width="640" height="1" fill="#9aa4c4" fill-opacity="0.2"/>
  <text x="72" y="552" font-family="Urbanist, 'Segoe UI', Helvetica, Arial, sans-serif" font-size="17" font-weight="600" fill="#9aa4c4" letter-spacing="2.6">AI CHAT &#183; VOICE AGENTS &#183; AUTOMATION &#183; ANALYTICS</text>
  <text x="72" y="582" font-family="Urbanist, 'Segoe UI', Helvetica, Arial, sans-serif" font-size="17" font-weight="600" fill="#ffffff" letter-spacing="2.6">VISTECHBOT.COM</text>
</svg>`;

await mkdir(OUT, { recursive: true });

await sharp(Buffer.from(svg)).jpeg({ quality: 88, progressive: true }).toFile(path.join(OUT, "og-image.jpg"));

// Some crawlers still prefer PNG; the extra weight is worth the compatibility.
await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(path.join(OUT, "og-image.png"));

await writeFile(path.join(OUT, "og-image.svg"), svg.trim(), "utf8");

console.log("Wrote public/og-image.jpg, .png and .svg (1200x630)");
