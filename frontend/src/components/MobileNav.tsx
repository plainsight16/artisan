import { Icon } from "./Icon";

export function MobileNav({
  view,
  home,
  goAccount,
  goMessages,
}: {
  view: "home" | "profile" | "account" | "messages";
  home: () => void;
  goAccount: () => void;
  goMessages: () => void;
}) {
  return (
    <nav className="mobile-nav">
      <button className={view === "home" ? "active" : ""} onClick={home}>
        <Icon>explore</Icon>
        <span>Explore</span>
      </button>
      <button
        className={view === "messages" ? "active" : ""}
        onClick={goMessages}
      >
        <Icon>chat_bubble</Icon>
        <span>Messages</span>
      </button>
      <button>
        <Icon>work</Icon>
        <span>Jobs</span>
      </button>
      <button
        className={view === "account" ? "active" : ""}
        onClick={goAccount}
      >
        <Icon>person</Icon>
        <span>Profile</span>
      </button>
    </nav>
  );
}
