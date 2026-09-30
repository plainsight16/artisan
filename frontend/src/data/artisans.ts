import type { Artisan, TradeFilter } from "../types";

export const TRADE_FILTERS: TradeFilter[] = [
  "All Trades",
  "Carpentry",
  "Welding",
  "Plumbing",
  "Electrical",
  "Shoemaking",
];

export const artisans: Artisan[] = [
  {
    id: 1,
    name: "Tunde's Woodworks",
    trade: "Carpenter",
    category: "Carpentry",
    location: "Ikeja",
    rating: "4.9",
    reviews: 124,
    image:
      "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=85",
    work: "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 2,
    name: "Bisi Welding",
    trade: "Welder",
    category: "Welding",
    location: "Surulere",
    rating: "4.8",
    reviews: 89,
    image:
      "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=85",
    work: "https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 3,
    name: "Godwin Plumbing",
    trade: "Plumber",
    category: "Plumbing",
    location: "Lekki",
    rating: "4.7",
    reviews: 210,
    image:
      "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=800&q=85",
    work: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 4,
    name: "Lagos Cobblers",
    trade: "Shoemaker",
    category: "Shoemaking",
    location: "Yaba",
    rating: "4.9",
    reviews: 156,
    image:
      "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&w=800&q=85",
    work: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 5,
    name: "Kola Electric",
    trade: "Electrician",
    category: "Electrical",
    location: "Mushin",
    rating: "4.6",
    reviews: 42,
    image:
      "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=800&q=85",
    work: "https://images.unsplash.com/photo-1555963966-b7ae5404b6a3?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 6,
    name: "Iron Masters",
    trade: "Welder",
    category: "Welding",
    location: "Apapa",
    rating: "4.8",
    reviews: 67,
    image:
      "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?auto=format&fit=crop&w=800&q=85",
    work: "https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?auto=format&fit=crop&w=1200&q=85",
  },
];

export function filterArtisans(
  filter: TradeFilter,
  query = "",
): Artisan[] {
  const needle = query.trim().toLowerCase();
  return artisans.filter((artisan) => {
    if (filter !== "All Trades" && artisan.category !== filter) return false;
    if (!needle) return true;
    const haystack = [
      artisan.name,
      artisan.trade,
      artisan.category,
      artisan.location,
    ]
      .join(" ")
      .toLowerCase();
    return haystack.includes(needle);
  });
}
