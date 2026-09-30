import { describe, expect, it } from "vitest";
import { artisans, filterArtisans } from "./artisans";

describe("filterArtisans", () => {
  it("returns every artisan for All Trades", () => {
    expect(filterArtisans("All Trades")).toHaveLength(artisans.length);
  });

  it("keeps carpentry jobs under Carpentry", () => {
    const hits = filterArtisans("Carpentry");
    expect(hits).toHaveLength(1);
    expect(hits[0]?.name).toBe("Tunde's Woodworks");
  });

  it("keeps welding jobs under Welding", () => {
    const hits = filterArtisans("Welding");
    expect(hits.map((item) => item.name)).toEqual([
      "Bisi Welding",
      "Iron Masters",
    ]);
  });

  it("keeps plumbing, electrical and shoemaking jobs on their tags", () => {
    expect(filterArtisans("Plumbing")[0]?.name).toBe("Godwin Plumbing");
    expect(filterArtisans("Electrical")[0]?.name).toBe("Kola Electric");
    expect(filterArtisans("Shoemaking")[0]?.name).toBe("Lagos Cobblers");
  });

  it("searches name, trade, category and area", () => {
    expect(filterArtisans("All Trades", "yaba")[0]?.name).toBe(
      "Lagos Cobblers",
    );
    expect(filterArtisans("Welding", "apapa")[0]?.name).toBe("Iron Masters");
    expect(filterArtisans("Carpentry", "bisi")).toHaveLength(0);
  });
});
