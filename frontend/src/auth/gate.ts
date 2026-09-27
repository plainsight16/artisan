import type { Session } from "./session";

export type ChatIntent = "chat" | null;

/** Chat is open to signed-in users; everyone else must sign in first. */
export function viewForChatIntent(session: Session | null): "chat" | "login" {
  return session ? "chat" : "login";
}

/** Login and signup are only reachable after the user commits to a chat. */
export function isAuthReachable(intent: ChatIntent): boolean {
  return intent === "chat";
}

/** After auth, resume the committed chat; otherwise stay on explore. */
export function viewAfterAuthSuccess(intent: ChatIntent): "chat" | "home" {
  return intent === "chat" ? "chat" : "home";
}
