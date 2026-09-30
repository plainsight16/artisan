import { Icon } from "./Icon";
import { ProfileMenu } from "./ProfileMenu";
import type { AccountPanel } from "../types";
import type { Session } from "../auth/session";

export function Header({
  view,
  home,
  session,
  onOpenAccount,
  onOpenMessages,
  onLogin,
  onSignup,
  onLogout,
}: {
  view: "home" | "profile" | "account" | "messages";
  home: () => void;
  session: Session | null;
  onOpenAccount: (panel?: AccountPanel) => void;
  onOpenMessages: () => void;
  onLogin: () => void;
  onSignup: () => void;
  onLogout: () => void;
}) {
  return (
    <header className="topbar">
      <button className="brand-mark" onClick={home} aria-label="Home">
        <Icon>handyman</Icon>
      </button>
      <button className="wordmark" onClick={home}>
        Artisan
      </button>
      <nav>
        <button className={view === "home" ? "active" : ""} onClick={home}>
          Explore
        </button>
        <button
          className={view === "messages" ? "active" : ""}
          onClick={onOpenMessages}
        >
          Messages
        </button>
        <button>Jobs</button>
        <ProfileMenu
          session={session}
          active={view === "account"}
          onOpenAccount={onOpenAccount}
          onLogin={onLogin}
          onSignup={onSignup}
          onLogout={onLogout}
        />
      </nav>
      <button className="icon-button">
        <Icon>search</Icon>
      </button>
    </header>
  );
}
