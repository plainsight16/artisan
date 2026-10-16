import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const PNG = "89504e470d0a1a0a";

function pngSize(buf: Buffer) {
  return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
}

describe("PWA install assets", () => {
  it("includes square PNG icons of at least 144px", () => {
    const small = readFileSync("public/pwa-192x192.png");
    const large = readFileSync("public/pwa-512x512.png");
    expect(small.subarray(0, 8).toString("hex")).toBe(PNG);
    expect(large.subarray(0, 8).toString("hex")).toBe(PNG);
    expect(pngSize(small)).toEqual({ width: 192, height: 192 });
    expect(pngSize(large)).toEqual({ width: 512, height: 512 });
  });

  it("includes a wide desktop screenshot and a narrow mobile screenshot", () => {
    const wide = pngSize(readFileSync("public/screenshot-wide.png"));
    const narrow = pngSize(readFileSync("public/screenshot-narrow.png"));
    expect(wide).toEqual({ width: 1280, height: 720 });
    expect(narrow).toEqual({ width: 540, height: 720 });
    expect(wide.width / wide.height).toBeGreaterThan(1);
    expect(narrow.height / narrow.width).toBeGreaterThan(1);
  });
});
