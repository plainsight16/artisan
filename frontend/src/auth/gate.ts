import type { Session } from "./session";

export type AuthIntent = "chat" | "account" | "messages" | null;

/** Messaging is open to signed-in users; guests must sign in first. */
export function viewForChatIntent(
  session: Session | null,
): "messages" | "login" {
  return session ? "messages" : "login";
}

export function viewForMessagesIntent(
  session: Session | null,
): "messages" | "login" {
  return session ? "messages" : "login";
}

/** The user account page is open only after sign-in. */
export function viewForAccountIntent(
  session: Session | null,
): "account" | "login" {
  return session ? "account" : "login";
}

/** Login and signup are only reachable after a chat, inbox, or account commitment. */
export function isAuthReachable(intent: AuthIntent): boolean {
  return intent === "chat" || intent === "account" || intent === "messages";
}

/** After auth, resume the committed destination. */
export function viewAfterAuthSuccess(
  intent: AuthIntent,
): "messages" | "account" | "home" {
  if (intent === "chat" || intent === "messages") return "messages";
  if (intent === "account") return "account";
  return "home";
}
