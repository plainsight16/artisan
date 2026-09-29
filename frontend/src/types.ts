export type View =
  | "home"
  | "profile"
  | "chat"
  | "login"
  | "signup"
  | "account";

export type AccountPanel = "saved" | "jobs" | "settings" | "help";

export type Artisan = {
  id: number;
  name: string;
  trade: string;
  location: string;
  rating: string;
  reviews: number;
  image: string;
  work: string;
};
