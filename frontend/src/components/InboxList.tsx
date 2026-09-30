import type { Conversation, InboxFilter } from "../data/conversations";
import { artisanForConversation } from "../data/conversations";
import { Icon } from "./Icon";

const FILTERS: { id: InboxFilter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "unread", label: "Unread" },
  { id: "awaiting", label: "Awaiting" },
];

export function InboxList({
  conversations,
  activeId,
  filter,
  query,
  unreadCount,
  awaitingCount,
  setFilter,
  setQuery,
  onSelect,
}: {
  conversations: Conversation[];
  activeId: number;
  filter: InboxFilter;
  query: string;
  unreadCount: number;
  awaitingCount: number;
  setFilter: (filter: InboxFilter) => void;
  setQuery: (query: string) => void;
  onSelect: (id: number) => void;
}) {
  return (
    <aside className="inbox">
      <h1>My messages</h1>
      <label className="inbox-search">
        <span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search name or job"
            aria-label="Search conversations"
          />
          <Icon>search</Icon>
        </span>
      </label>
      <div className="inbox-filters">
        {FILTERS.map((item) => {
          const count =
            item.id === "unread"
              ? unreadCount
              : item.id === "awaiting"
                ? awaitingCount
                : null;
          return (
            <button
              key={item.id}
              className={filter === item.id ? "selected" : ""}
              onClick={() => setFilter(item.id)}
            >
              {item.label}
              {count ? ` (${count})` : ""}
            </button>
          );
        })}
      </div>
      {conversations.length === 0 ? (
        <p className="inbox-empty">No conversations match that search.</p>
      ) : (
        <ul className="inbox-list">
          {conversations.map((item) => {
            const artisan = artisanForConversation(item);
            if (!artisan) return null;
            return (
              <li key={item.id}>
                <button
                  className={item.id === activeId ? "active" : ""}
                  onClick={() => onSelect(item.id)}
                >
                  <img src={artisan.image} alt="" />
                  <div>
                    <b>
                      {artisan.name}
                      <time>{item.time}</time>
                    </b>
                    <span>{item.job}</span>
                    <small>{item.preview}</small>
                  </div>
                  {item.unread ? (
                    <i className="unread-dot" aria-hidden="true" />
                  ) : null}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </aside>
  );
}
