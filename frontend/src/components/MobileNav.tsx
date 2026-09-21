import { Icon } from "./Icon";

export function MobileNav({ home }: { home: () => void }) {
  return (
    <nav className="mobile-nav">
      <button className="active" onClick={home}>
        <Icon>explore</Icon>
        <span>Explore</span>
      </button>
      <button>
        <Icon>chat_bubble</Icon>
        <span>Messages</span>
      </button>
      <button>
        <Icon>work</Icon>
        <span>Jobs</span>
      </button>
      <button>
        <Icon>person</Icon>
        <span>Profile</span>
      </button>
    </nav>
  );
}
