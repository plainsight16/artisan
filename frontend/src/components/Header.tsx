import { Icon } from "./Icon";
import { ProfileMenu } from "./ProfileMenu";
import type { AccountPanel } from "../types";
import type { Session } from "../auth/session";

export function Header({
  view,
  home,
  session,
  searchOpen,
  query,
  setQuery,
  onOpenSearch,
  onCloseSearch,
  onOpenAccount,
  onOpenMessages,
  onLogin,
  onSignup,
  onLogout,
}: {
  view: "home" | "profile" | "account" | "messages";
  home: () => void;
  session: Session | null;
  searchOpen: boolean;
  query: string;
  setQuery: (query: string) => void;
  onOpenSearch: () => void;
  onCloseSearch: () => void;
  onOpenAccount: (panel?: AccountPanel) => void;
  onOpenMessages: () => void;
  onLogin: () => void;
  onSignup: () => void;
  onLogout: () => void;
}) {
  return (
    <header className={searchOpen ? "topbar searching" : "topbar"}>
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
      <div className={searchOpen ? "topbar-search open" : "topbar-search"}>
        {searchOpen ? (
          <form
            className="topbar-search-form"
            onSubmit={(event) => event.preventDefault()}
          >
            <Icon>search</Icon>
            <input
              autoFocus
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Escape") onCloseSearch();
              }}
              placeholder="Search name, trade or area"
              aria-label="Search artisans"
            />
            <button
              type="button"
              className="icon-button"
              onClick={onCloseSearch}
              aria-label="Close search"
            >
              <Icon>close</Icon>
            </button>
          </form>
        ) : (
          <button
            className="icon-button"
            onClick={onOpenSearch}
            aria-label="Search artisans"
          >
            <Icon>search</Icon>
          </button>
        )}
      </div>
    </header>
  );
}
