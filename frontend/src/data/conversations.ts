import { artisans } from "./artisans";
import type { Artisan } from "../types";

export type InboxFilter = "all" | "unread" | "awaiting";

export type ThreadMessage = {
  id: string;
  own: boolean;
  time: string;
  text?: string;
  image?: string;
  estimate?: { range: string; note: string };
};

export type Conversation = {
  id: number;
  artisanId: number;
  job: string;
  preview: string;
  time: string;
  unread: boolean;
  awaiting: boolean;
  messages: ThreadMessage[];
};

export const conversations: Conversation[] = [
  {
    id: 1,
    artisanId: 1,
    job: "Kitchen shelves · Ikeja",
    preview: "Please share a little about what you need…",
    time: "12:03",
    unread: true,
    awaiting: false,
    messages: [
      {
        id: "t1",
        own: true,
        time: "09:48 AM",
        text: "Hi Tunde, I need a quote for kitchen shelves at my home in Ikeja. Can you help?",
      },
      {
        id: "t2",
        own: false,
        time: "09:51 AM",
        text: "Good morning! Absolutely — share the wall length and whether you want open shelves or closed cabinets.",
      },
      {
        id: "t3",
        own: false,
        time: "09:52 AM",
        text: "I recently finished a similar run of oak shelves. Here’s the quality you can expect.",
        image:
          "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=1200&q=85",
        estimate: {
          range: "₦180,000 – ₦240,000",
          note: "Includes timber, wall fixing and a clear finish. Final price depends on measurements.",
        },
      },
    ],
  },
  {
    id: 2,
    artisanId: 2,
    job: "Compound gate repair · Surulere",
    preview: "I can come through on Thursday to take measurements.",
    time: "Yesterday",
    unread: false,
    awaiting: true,
    messages: [
      {
        id: "b1",
        own: true,
        time: "04:10 PM",
        text: "The pedestrian gate is sagging and scraping the concrete. Can you realign it?",
      },
      {
        id: "b2",
        own: false,
        time: "04:22 PM",
        text: "Yes — likely a bent hinge pin. I can come through on Thursday to take measurements. Should I lock that in?",
      },
    ],
  },
  {
    id: 3,
    artisanId: 3,
    job: "Kitchen leak · Lekki",
    preview: "Leak is sealed. I’ll send the invoice this evening.",
    time: "Mon",
    unread: true,
    awaiting: false,
    messages: [
      {
        id: "g1",
        own: true,
        time: "08:02 AM",
        text: "There’s a drip under the kitchen sink — water on the cabinet floor.",
      },
      {
        id: "g2",
        own: false,
        time: "11:40 AM",
        text: "Leak is sealed. I’ll send the invoice this evening.",
      },
    ],
  },
];

export function artisanForConversation(
  conversation: Conversation,
): Artisan | undefined {
  return artisans.find((artisan) => artisan.id === conversation.artisanId);
}

export function conversationForArtisan(artisan: Artisan): Conversation {
  const existing = conversations.find((item) => item.artisanId === artisan.id);
  if (existing) return existing;
  return {
    id: artisan.id + 100,
    artisanId: artisan.id,
    job: `${artisan.trade} project · ${artisan.location}`,
    preview: "Start the conversation when you’re ready.",
    time: "Now",
    unread: false,
    awaiting: false,
    messages: [
      {
        id: `new-${artisan.id}`,
        own: true,
        time: "Just now",
        text: `Hi ${artisan.name.split(" ")[0]}, I need a quote for a project at my home in ${artisan.location}. Can you help?`,
      },
    ],
  };
}

export function filterInbox(
  items: Conversation[],
  filter: InboxFilter,
  query: string,
): Conversation[] {
  const needle = query.trim().toLowerCase();
  return items.filter((item) => {
    if (filter === "unread" && !item.unread) return false;
    if (filter === "awaiting" && !item.awaiting) return false;
    if (!needle) return true;
    const artisan = artisanForConversation(item);
    const haystack = [
      artisan?.name,
      artisan?.trade,
      artisan?.location,
      item.job,
      item.preview,
    ]
      .join(" ")
      .toLowerCase();
    return haystack.includes(needle);
  });
}
