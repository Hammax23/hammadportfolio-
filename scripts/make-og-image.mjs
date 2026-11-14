import path from "path";
import sharp from "sharp";

const out = path.join("public", "og-image.jpg");
const portrait = path.join("public", "images", "hammad-portrait.png");

const meta = await sharp(portrait).metadata();
const w = meta.width || 1;
const h = meta.height || 1;
const side = Math.min(w, Math.round(h * 0.55));
const left = Math.max(0, Math.round((w - side) / 2));
const top = Math.max(0, Math.round(h * 0.02));

const face = await sharp(portrait)
  .extract({ left, top, width: side, height: Math.min(side, h - top) })
  .resize(420, 420, { fit: "cover", position: "top" })
  .png()
  .toBuffer();

const svg = Buffer.from(`<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0a0e12"/>
      <stop offset="55%" stop-color="#121820"/>
      <stop offset="100%" stop-color="#0d5c4d"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <circle cx="1040" cy="80" r="180" fill="white" fill-opacity="0.04"/>
  <circle cx="120" cy="560" r="200" fill="white" fill-opacity="0.03"/>
  <text x="72" y="150" fill="#7dceb8" font-family="Segoe UI, Arial" font-size="22" letter-spacing="4">FULL STACK ENGINEER</text>
  <text x="72" y="250" fill="white" font-family="Segoe UI, Arial" font-size="64" font-weight="700">Hammad Iftikhar</text>
  <text x="72" y="320" fill="white" fill-opacity="0.72" font-family="Segoe UI, Arial" font-size="28">Next.js · Laravel · React Native</text>
  <text x="72" y="390" fill="white" fill-opacity="0.55" font-family="Segoe UI, Arial" font-size="22">6+ years building SaaS, mobile apps, and APIs</text>
  <text x="72" y="540" fill="white" fill-opacity="0.45" font-family="Segoe UI, Arial" font-size="20">www.hammadiftikhar.com</text>
</svg>`);

await sharp(svg)
  .composite([
    {
      input: face,
      top: 105,
      left: 720,
    },
  ])
  .jpeg({ quality: 88 })
  .toFile(out);

console.log("wrote", out);
