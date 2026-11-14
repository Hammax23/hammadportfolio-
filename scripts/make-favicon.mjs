import fs from "fs";
import path from "path";
import sharp from "sharp";
import pngToIco from "png-to-ico";

const src = path.join("public", "images", "hammad-portrait.png");
const meta = await sharp(src).metadata();
const w = meta.width || 1;
const h = meta.height || 1;

// Face-focused square from upper portion of portrait
const side = Math.round(Math.min(w, h * 0.55));
const left = Math.max(0, Math.round((w - side) / 2));
const top = Math.max(0, Math.round(h * 0.02));

async function squarePng(size, out, circular = false) {
  let pipeline = sharp(src)
    .extract({ left, top, width: side, height: Math.min(side, h - top) })
    .resize(size, size, { fit: "cover", position: "top" });

  if (circular) {
    const radius = size / 2;
    const circle = Buffer.from(
      `<svg width="${size}" height="${size}"><circle cx="${radius}" cy="${radius}" r="${radius}" fill="#fff"/></svg>`,
    );
    pipeline = pipeline.composite([{ input: circle, blend: "dest-in" }]);
  }

  await pipeline.png().toFile(out);
  console.log("wrote", out);
}

await squarePng(512, path.join("src", "app", "icon.png"));
await squarePng(180, path.join("src", "app", "apple-icon.png"));
await squarePng(180, path.join("public", "apple-icon.png"));
await squarePng(192, path.join("public", "icon-192.png"), true);
await squarePng(512, path.join("public", "icon-512.png"), true);

const files = [];
for (const size of [16, 32, 48]) {
  const file = path.join("public", `fav-${size}.png`);
  await squarePng(size, file);
  files.push(file);
}

const ico = await pngToIco(files);
fs.writeFileSync(path.join("src", "app", "favicon.ico"), ico);
fs.writeFileSync(path.join("public", "favicon.ico"), ico);
for (const file of files) fs.unlinkSync(file);

console.log("favicon.ico written", ico.length);
