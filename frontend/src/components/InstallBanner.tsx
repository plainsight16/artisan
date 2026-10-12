import { useEffect, useState } from "react";
import { Icon } from "./Icon";
import {
  canPromptInstall,
  dismissInstall,
  isStandalone,
  wasInstallDismissed,
} from "../pwa/install";

export function InstallBanner() {
  const [event, setEvent] = useState<BeforeInstallPromptEvent | null>(null);
  const [hidden, setHidden] = useState(
    () => isStandalone() || wasInstallDismissed(),
  );

  useEffect(() => {
    if (hidden) return;
    const onPrompt = (e: Event) => {
      e.preventDefault();
      setEvent(e as BeforeInstallPromptEvent);
    };
    window.addEventListener("beforeinstallprompt", onPrompt);
    return () => window.removeEventListener("beforeinstallprompt", onPrompt);
  }, [hidden]);

  const close = () => {
    dismissInstall();
    setHidden(true);
    setEvent(null);
  };
  const install = async () => {
    if (!event) return;
    await event.prompt();
    await event.userChoice;
    close();
  };

  if (hidden || !canPromptInstall(event)) return null;
  return (
    <aside className="install-banner">
      <div>
        <b>Install Artisan</b>
        <p>Add it to your home screen for quicker access to artisans nearby.</p>
      </div>
      <button className="primary" type="button" onClick={() => void install()}>
        Install
      </button>
      <button
        className="icon-button"
        type="button"
        onClick={close}
        aria-label="Dismiss install"
      >
        <Icon>close</Icon>
      </button>
    </aside>
  );
}
