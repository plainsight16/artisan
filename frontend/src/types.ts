export type View =
  | "home"
  | "profile"
  | "messages"
  | "login"
  | "signup"
  | "account";

export type AccountPanel = "saved" | "jobs" | "settings" | "help";

export type TradeCategory =
  | "Carpentry"
  | "Welding"
  | "Plumbing"
  | "Electrical"
  | "Shoemaking";

export type TradeFilter = "All Trades" | TradeCategory;

export type Artisan = {
  id: number;
  name: string;
  trade: string;
  category: TradeCategory;
  location: string;
  rating: string;
  reviews: number;
  image: string;
  work: string;
};
