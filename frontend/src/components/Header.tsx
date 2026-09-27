import { Icon } from "./Icon";

export function Header({
  view,
  home,
}: {
  view: "home" | "profile";
  home: () => void;
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
        <button>Messages</button>
        <button>Jobs</button>
        <button>Profile</button>
      </nav>
      <button className="icon-button">
        <Icon>search</Icon>
      </button>
    </header>
  );
}
