import path from "path";
import sharp from "sharp";

async function make(name, title, subtitle, accent) {
  const svg = `<svg width="1200" height="960" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#0a0e12"/>
        <stop offset="55%" stop-color="#121820"/>
        <stop offset="100%" stop-color="${accent}"/>
      </linearGradient>
    </defs>
    <rect width="1200" height="960" fill="url(#g)"/>
    <circle cx="980" cy="160" r="180" fill="white" fill-opacity="0.04"/>
    <circle cx="180" cy="780" r="220" fill="white" fill-opacity="0.03"/>
    <rect x="90" y="120" width="420" height="720" rx="36" fill="#f3f4f6" fill-opacity="0.08" stroke="white" stroke-opacity="0.18"/>
    <rect x="120" y="160" width="360" height="640" rx="24" fill="#0a0e12" fill-opacity="0.55"/>
    <circle cx="300" cy="300" r="44" fill="${accent}" fill-opacity="0.9"/>
    <path d="M270 300h60M300 270v60" stroke="white" stroke-width="4" stroke-linecap="round"/>
    <text x="140" y="420" fill="white" font-family="Segoe UI, Arial" font-size="34" font-weight="700">${title}</text>
    <text x="140" y="470" fill="white" fill-opacity="0.65" font-family="Segoe UI, Arial" font-size="22">${subtitle}</text>
    <text x="140" y="560" fill="white" fill-opacity="0.45" font-family="Segoe UI, Arial" font-size="18">React Native · Live rides · Realtime</text>
    <rect x="140" y="620" width="200" height="10" rx="5" fill="white" fill-opacity="0.2"/>
    <rect x="140" y="650" width="160" height="10" rx="5" fill="white" fill-opacity="0.12"/>
    <rect x="140" y="680" width="240" height="10" rx="5" fill="white" fill-opacity="0.12"/>
  </svg>`;

  const out = path.join("public", "images", "projects", name);
  await sharp(Buffer.from(svg)).jpeg({ quality: 86 }).toFile(out);
  console.log("wrote", out);
}

await make("sarj-chauffeur-app.jpg", "SARJ", "Chauffeur App", "#0d5c4d");
await make("imas-app.jpg", "IMAS", "Chauffeur Platform", "#1a4d6d");
