import { beforeEach, describe, expect, it } from "vitest";
import {
  loadSession,
  saveSession,
  SESSION_KEY,
  sessionFromLogin,
  sessionFromSignup,
} from "./session";

describe("session storage", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("stores only a versioned name and email, never a password", () => {
    saveSession({ name: "Ada", email: "ada@example.com" });
    expect(localStorage.getItem(SESSION_KEY)).toBe(
      JSON.stringify({ name: "Ada", email: "ada@example.com" }),
    );
    expect(localStorage.getItem(SESSION_KEY)).not.toContain("password");
  });

  it("loads a saved session", () => {
    saveSession({ name: "Ada", email: "ada@example.com" });
    expect(loadSession()).toEqual({ name: "Ada", email: "ada@example.com" });
  });

  it("returns null when nothing is stored", () => {
    expect(loadSession()).toBeNull();
  });

  it("ignores corrupt storage", () => {
    localStorage.setItem(SESSION_KEY, "{not json");
    expect(loadSession()).toBeNull();
  });
});

describe("sessionFromLogin", () => {
  it("uses the email local-part as a display name", () => {
    expect(sessionFromLogin("ada@example.com")).toEqual({
      name: "ada",
      email: "ada@example.com",
    });
  });
});

describe("sessionFromSignup", () => {
  it("keeps the supplied name and email", () => {
    expect(sessionFromSignup("  Ada  ", " ada@example.com ")).toEqual({
      name: "Ada",
      email: "ada@example.com",
    });
  });
});
