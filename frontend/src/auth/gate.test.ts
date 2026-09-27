import { describe, expect, it } from "vitest";
import {
  isAuthReachable,
  viewAfterAuthSuccess,
  viewForChatIntent,
} from "./gate";
import type { Session } from "./session";

const session: Session = { name: "Ada", email: "ada@example.com" };

describe("viewForChatIntent", () => {
  it("sends signed-in users straight to chat", () => {
    expect(viewForChatIntent(session)).toBe("chat");
  });

  it("asks guests to sign in instead of opening chat", () => {
    expect(viewForChatIntent(null)).toBe("login");
  });
});

describe("isAuthReachable", () => {
  it("keeps login and signup unreachable until the user commits to a chat", () => {
    expect(isAuthReachable(null)).toBe(false);
  });

  it("opens auth only after a chat commitment", () => {
    expect(isAuthReachable("chat")).toBe(true);
  });
});

describe("viewAfterAuthSuccess", () => {
  it("resumes chat when auth followed a chat commitment", () => {
    expect(viewAfterAuthSuccess("chat")).toBe("chat");
  });

  it("does not invent a chat if auth was reached without intent", () => {
    expect(viewAfterAuthSuccess(null)).toBe("home");
  });
});
