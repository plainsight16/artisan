export const SESSION_KEY = "artisanSession:v1";

export type Session = {
  name: string;
  email: string;
};

function isSession(value: unknown): value is Session {
  if (!value || typeof value !== "object") return false;
  const { name, email } = value as Session;
  return typeof name === "string" && typeof email === "string";
}

export function loadSession(): Session | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    return isSession(parsed) ? { name: parsed.name, email: parsed.email } : null;
  } catch {
    return null;
  }
}

export function saveSession(session: Session): void {
  try {
    localStorage.setItem(
      SESSION_KEY,
      JSON.stringify({ name: session.name, email: session.email }),
    );
  } catch {
    // private browsing, quota, or disabled storage
  }
}

export function clearSession(): void {
  try {
    localStorage.removeItem(SESSION_KEY);
  } catch {
    // private browsing or disabled storage
  }
}

export function sessionFromLogin(email: string): Session {
  const local = email.split("@")[0] || "Guest";
  return { name: local, email };
}

export function sessionFromSignup(name: string, email: string): Session {
  return { name: name.trim(), email: email.trim() };
}
