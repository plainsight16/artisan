import { describe, expect, it } from "vitest";
import { conversations, filterInbox } from "./conversations";

describe("filterInbox", () => {
  it("returns every conversation for All", () => {
    expect(filterInbox(conversations, "all", "")).toHaveLength(
      conversations.length,
    );
  });

  it("keeps only unread threads", () => {
    const unread = filterInbox(conversations, "unread", "");
    expect(unread.length).toBeGreaterThan(0);
    expect(unread.every((item) => item.unread)).toBe(true);
  });

  it("keeps only threads awaiting a reply", () => {
    const awaiting = filterInbox(conversations, "awaiting", "");
    expect(awaiting.every((item) => item.awaiting)).toBe(true);
  });

  it("matches artisan name or job text", () => {
    const hits = filterInbox(conversations, "all", "gate");
    expect(hits).toHaveLength(1);
    expect(hits[0]?.job).toMatch(/gate/i);
  });
});
