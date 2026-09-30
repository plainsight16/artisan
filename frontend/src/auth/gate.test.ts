import { describe, expect, it } from "vitest";
import {
  isAuthReachable,
  viewAfterAuthSuccess,
  viewForAccountIntent,
  viewForChatIntent,
  viewForMessagesIntent,
} from "./gate";
import type { Session } from "./session";

const session: Session = { name: "Ada", email: "ada@example.com" };

describe("viewForChatIntent", () => {
  it("sends signed-in users to their messages inbox", () => {
    expect(viewForChatIntent(session)).toBe("messages");
  });

  it("asks guests to sign in instead of opening chat", () => {
    expect(viewForChatIntent(null)).toBe("login");
  });
});

describe("viewForMessagesIntent", () => {
  it("sends signed-in users to messages", () => {
    expect(viewForMessagesIntent(session)).toBe("messages");
  });

  it("asks guests to sign in instead of opening the inbox", () => {
    expect(viewForMessagesIntent(null)).toBe("login");
  });
});

describe("viewForAccountIntent", () => {
  it("sends signed-in users to their account", () => {
    expect(viewForAccountIntent(session)).toBe("account");
  });

  it("asks guests to sign in instead of opening the account page", () => {
    expect(viewForAccountIntent(null)).toBe("login");
  });
});

describe("isAuthReachable", () => {
  it("keeps login and signup unreachable until the user commits", () => {
    expect(isAuthReachable(null)).toBe(false);
  });

  it("opens auth after a chat commitment", () => {
    expect(isAuthReachable("chat")).toBe(true);
  });

  it("opens auth after an account commitment", () => {
    expect(isAuthReachable("account")).toBe(true);
  });

  it("opens auth after an inbox commitment", () => {
    expect(isAuthReachable("messages")).toBe(true);
  });
});

describe("viewAfterAuthSuccess", () => {
  it("opens messages when auth followed a chat commitment", () => {
    expect(viewAfterAuthSuccess("chat")).toBe("messages");
  });

  it("opens messages when auth followed an inbox commitment", () => {
    expect(viewAfterAuthSuccess("messages")).toBe("messages");
  });

  it("opens the account page when auth followed a profile commitment", () => {
    expect(viewAfterAuthSuccess("account")).toBe("account");
  });

  it("does not invent a destination if auth was reached without intent", () => {
    expect(viewAfterAuthSuccess(null)).toBe("home");
  });
});
