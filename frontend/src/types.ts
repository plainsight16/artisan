export type View = "home" | "profile" | "chat" | "login" | "signup";

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
