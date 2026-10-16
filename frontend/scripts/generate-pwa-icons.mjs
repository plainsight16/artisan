import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { Resvg } from "@resvg/resvg-js";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const publicDir = join(root, "public");

function writePng(svgName, pngName, width) {
  const svg = readFileSync(join(publicDir, svgName));
  const png = new Resvg(svg, {
    fitTo: { mode: "width", value: width },
    font: { loadSystemFonts: true },
  })
    .render()
    .asPng();
  writeFileSync(join(publicDir, pngName), png);
}

writePng("icon.svg", "pwa-192x192.png", 192);
writePng("icon.svg", "pwa-512x512.png", 512);
writePng("icon.svg", "apple-touch-icon.png", 180);
writePng("screenshot-wide.svg", "screenshot-wide.png", 1280);
writePng("screenshot-narrow.svg", "screenshot-narrow.png", 540);
