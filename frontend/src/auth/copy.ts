import type { Artisan } from "../types";
import type { AuthIntent } from "./gate";

export function authCopy(intent: AuthIntent, artisan: Artisan) {
  if (intent === "account") {
    return {
      eyebrow: "YOUR ARTISAN ACCOUNT",
      loginTitle: "Sign in to view your profile",
      signupTitle: "Create an account to hire with confidence",
    };
  }
  return {
    eyebrow: "TO CONTINUE YOUR CONVERSATION",
    loginTitle: `Sign in to chat with ${artisan.name}`,
    signupTitle: `Create an account to chat with ${artisan.name}`,
  };
}
