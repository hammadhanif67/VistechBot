/**
 * App icons, rendered from the favicon's own geometry.
 *
 * Not new artwork — the same mark at the sizes a phone home screen and a PWA
 * install prompt ask for. `apple-touch-icon` previously pointed at the 1200x630
 * Open Graph image, which iOS crops to a square: the result was the middle
 * third of a social card sitting on someone's home screen.
 *
 *   npm run generate:icons
 */
import sharp from "sharp";
import fs from "node:fs";

const svg = fs.readFileSync("public/favicon.svg", "utf8");

const targets = [
  ["public/apple-touch-icon.png", 180],
  ["public/icon-192.png", 192],
  ["public/icon-512.png", 512],
];

for (const [out, size] of targets) {
  // Rasterise well above the target, then downsample, so the mark's hard edges
  // stay crisp instead of picking up the SVG's 32px grid.
  await sharp(Buffer.from(svg), { density: 512 })
    .resize(size, size, { fit: "fill" })
    .png({ compressionLevel: 9 })
    .toFile(out);

  console.log(`${out}  ${size}x${size}  ${(fs.statSync(out).size / 1024).toFixed(1)} kB`);
}
