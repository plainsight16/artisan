import { useState } from "react";
import type { Artisan } from "../types";
import type { Conversation, InboxFilter } from "../data/conversations";
import {
  artisanForConversation,
  conversationForArtisan,
  conversations as seedConversations,
  filterInbox,
} from "../data/conversations";
import { InboxList } from "./InboxList";
import { Thread } from "./Thread";

function conversationsWithFocus(
  focusArtisan: Artisan | null,
): Conversation[] {
  if (!focusArtisan) return seedConversations;
  if (seedConversations.some((item) => item.artisanId === focusArtisan.id)) {
    return seedConversations;
  }
  return [conversationForArtisan(focusArtisan), ...seedConversations];
}

export function Messages({
  focusArtisan,
  openThread,
  onViewProfile,
}: {
  focusArtisan: Artisan | null;
  openThread: boolean;
  onViewProfile: (artisan: Artisan) => void;
}) {
  const [items, setItems] = useState(() =>
    conversationsWithFocus(focusArtisan),
  );
  const [filter, setFilter] = useState<InboxFilter>("all");
  const [query, setQuery] = useState("");
  const [draft, setDraft] = useState("");
  const [threadOpen, setThreadOpen] = useState(openThread);
  const focused = items.find((item) => item.artisanId === focusArtisan?.id);
  const [activeId, setActiveId] = useState(
    focused?.id ?? items[0]?.id ?? 1,
  );
  const visible = filterInbox(items, filter, query);
  const active =
    visible.find((item) => item.id === activeId) ?? visible[0] ?? items[0];
  const artisan = active ? artisanForConversation(active) : null;
  const unreadCount = items.filter((item) => item.unread).length;
  const awaitingCount = items.filter((item) => item.awaiting).length;

  const select = (id: number) => {
    setActiveId(id);
    setThreadOpen(true);
    setItems((current) =>
      current.map((item) =>
        item.id === id ? { ...item, unread: false } : item,
      ),
    );
  };
  const send = () => {
    if (!draft.trim() || !active) return;
    const text = draft.trim();
    setItems((current) =>
      current.map((item) =>
        item.id === active.id
          ? {
              ...item,
              preview: text,
              time: "Now",
              awaiting: false,
              messages: [
                ...item.messages,
                {
                  id: `${active.id}-${item.messages.length + 1}`,
                  own: true,
                  time: "Just now",
                  text,
                },
              ],
            }
          : item,
      ),
    );
    setDraft("");
  };

  return (
    <main
      className={threadOpen ? "messages-page thread-open" : "messages-page"}
    >
      <InboxList
        conversations={visible}
        activeId={active?.id ?? 0}
        filter={filter}
        query={query}
        unreadCount={unreadCount}
        awaitingCount={awaitingCount}
        setFilter={setFilter}
        setQuery={setQuery}
        onSelect={select}
      />
      {active && artisan ? (
        <Thread
          artisan={artisan}
          conversation={active}
          draft={draft}
          setDraft={setDraft}
          send={send}
          onBack={() => setThreadOpen(false)}
          onViewProfile={() => onViewProfile(artisan)}
        />
      ) : (
        <section className="thread thread-empty">
          <p>Select a conversation to keep planning the job.</p>
        </section>
      )}
    </main>
  );
}
