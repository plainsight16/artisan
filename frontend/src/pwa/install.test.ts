import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  canPromptInstall,
  dismissInstall,
  INSTALL_DISMISS_KEY,
  isStandalone,
  wasInstallDismissed,
} from "./install";

describe("PWA install helpers", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("detects an installed standalone window", () => {
    const media = vi.fn().mockReturnValue({ matches: true });
    expect(isStandalone(media, {})).toBe(true);
  });

  it("detects iOS Safari standalone", () => {
    const media = vi.fn().mockReturnValue({ matches: false });
    expect(isStandalone(media, { standalone: true })).toBe(true);
  });

  it("hides the prompt after dismiss and when already installed", () => {
    const event = {} as BeforeInstallPromptEvent;
    vi.spyOn(window, "matchMedia").mockReturnValue({
      matches: false,
    } as MediaQueryList);

    expect(canPromptInstall(event)).toBe(true);
    dismissInstall();
    expect(wasInstallDismissed()).toBe(true);
    expect(localStorage.getItem(INSTALL_DISMISS_KEY)).toBe("1");
    expect(canPromptInstall(event)).toBe(false);
  });
});
