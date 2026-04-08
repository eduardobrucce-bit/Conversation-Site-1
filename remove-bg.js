const fs = require("fs");
const { PNG } = require("pngjs");

const input = fs.readFileSync("attached_assets/LOGO_2_1775676920511.PNG");
const png = PNG.sync.read(input);

const { width, height, data } = png;

// Background color from corners
const bgR = 204, bgG = 201, bgB = 191;
console.log(`Background color: rgb(${bgR}, ${bgG}, ${bgB})`);

// Verify white and gold are preserved at tolerance=45:
// White (245,245,245): dist = sqrt((41)^2+(44)^2+(54)^2) = ~81 > 45 ✓ preserved
// Gold (~190,160,80): dist = sqrt((14)^2+(41)^2+(111)^2) = ~119 > 45 ✓ preserved

const THRESHOLD = 45;

let removed = 0;
for (let i = 0; i < width * height; i++) {
  const idx = i * 4;
  const r = data[idx], g = data[idx+1], b = data[idx+2];
  const dist = Math.sqrt((r-bgR)**2 + (g-bgG)**2 + (b-bgB)**2);
  if (dist < THRESHOLD) {
    // Smooth edge
    const alpha = Math.round((dist / THRESHOLD) * 255);
    data[idx+3] = alpha;
    removed++;
  }
}

console.log(`Removed ${removed} background pixels (${Math.round(removed/(width*height)*100)}% of image)`);

fs.writeFileSync("artifacts/dona-ruth/public/logo.png", PNG.sync.write(png));
console.log("Saved to artifacts/dona-ruth/public/logo.png");
