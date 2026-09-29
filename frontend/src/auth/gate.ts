import type { Session } from "./session";

export type AuthIntent = "chat" | "account" | null;

/** Chat is open to signed-in users; everyone else must sign in first. */
export function viewForChatIntent(session: Session | null): "chat" | "login" {
  return session ? "chat" : "login";
}

/** The user account page is open only after sign-in. */
export function viewForAccountIntent(
  session: Session | null,
): "account" | "login" {
  return session ? "account" : "login";
}

/** Login and signup are only reachable after a chat or account commitment. */
export function isAuthReachable(intent: AuthIntent): boolean {
  return intent === "chat" || intent === "account";
}

/** After auth, resume the committed destination. */
export function viewAfterAuthSuccess(
  intent: AuthIntent,
): "chat" | "account" | "home" {
  if (intent === "chat") return "chat";
  if (intent === "account") return "account";
  return "home";
}
