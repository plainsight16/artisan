import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { Resvg } from "@resvg/resvg-js";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const svg = readFileSync(join(root, "public/icon.svg"));

function writePng(name, width) {
  const png = new Resvg(svg, {
    fitTo: { mode: "width", value: width },
  })
    .render()
    .asPng();
  writeFileSync(join(root, "public", name), png);
}

writePng("pwa-192x192.png", 192);
writePng("pwa-512x512.png", 512);
writePng("apple-touch-icon.png", 180);
