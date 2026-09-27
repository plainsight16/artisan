import { describe, expect, it } from "vitest";
import { validateCredentials, validateSignup } from "./validate";

describe("validateCredentials", () => {
  it("rejects a missing or invalid email", () => {
    expect(validateCredentials("", "password1")).toBe(
      "Enter a valid email address.",
    );
    expect(validateCredentials("ada", "password1")).toBe(
      "Enter a valid email address.",
    );
  });

  it("rejects a short password", () => {
    expect(validateCredentials("ada@example.com", "short")).toBe(
      "Password must be at least 8 characters.",
    );
  });

  it("accepts a valid email and password", () => {
    expect(validateCredentials("ada@example.com", "password1")).toBeNull();
  });
});

describe("validateSignup", () => {
  it("requires a name before credential checks", () => {
    expect(validateSignup("  ", "ada@example.com", "password1")).toBe(
      "Enter your name.",
    );
  });

  it("accepts a complete signup", () => {
    expect(validateSignup("Ada", "ada@example.com", "password1")).toBeNull();
  });
});
