export const INSTALL_DISMISS_KEY = "artisanInstallHint:v1";

export function isStandalone(
  media: (query: string) => { matches: boolean } = (query) =>
    typeof window.matchMedia === "function"
      ? window.matchMedia(query)
      : { matches: false },
  nav: Pick<Navigator, "standalone"> = navigator,
): boolean {
  return media("(display-mode: standalone)").matches || Boolean(nav.standalone);
}

export function wasInstallDismissed(): boolean {
  try {
    return localStorage.getItem(INSTALL_DISMISS_KEY) === "1";
  } catch {
    return false;
  }
}

export function dismissInstall(): void {
  try {
    localStorage.setItem(INSTALL_DISMISS_KEY, "1");
  } catch {
    // private browsing, quota, or disabled storage
  }
}

export function canPromptInstall(
  event: BeforeInstallPromptEvent | null,
): event is BeforeInstallPromptEvent {
  return Boolean(event) && !isStandalone() && !wasInstallDismissed();
}
