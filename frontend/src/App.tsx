import { useState } from "react";
import "./index.css";
import "./App.css";
import type { Artisan, View } from "./types";
import { artisans, filterArtisans } from "./data/artisans";
import { Header } from "./components/Header";
import { Home } from "./components/Home";
import { Profile } from "./components/Profile";
import { Chat } from "./components/Chat";
import { MobileNav } from "./components/MobileNav";

export default function App() {
  const [view, setView] = useState<View>("home");
  const [selected, setSelected] = useState<Artisan>(artisans[0]);
  const [filter, setFilter] = useState("All Trades");
  const [saved, setSaved] = useState<number[]>([]);
  const [messages, setMessages] = useState<string[]>([]);
  const [draft, setDraft] = useState("");
  const filtered = filterArtisans(filter);
  const goHome = () => setView("home");
  const goProfile = (artisan: Artisan) => {
    setSelected(artisan);
    setView("profile");
    window.scrollTo(0, 0);
  };
  const goChat = (artisan = selected) => {
    setSelected(artisan);
    setView("chat");
    window.scrollTo(0, 0);
  };
  const toggleSaved = (id: number) => {
    setSaved((x) =>
      x.includes(id) ? x.filter((n) => n !== id) : [...x, id],
    );
  };
  const send = () => {
    if (!draft.trim()) return;
    setMessages((m) => [...m, draft.trim()]);
    setDraft("");
  };

  if (view === "chat")
    return (
      <Chat
        artisan={selected}
        messages={messages}
        draft={draft}
        setDraft={setDraft}
        send={send}
        back={() => setView("profile")}
      />
    );
  return (
    <div className="app-shell">
      <Header view={view} home={goHome} />
      {view === "home" ? (
        <Home
          artisans={filtered}
          filter={filter}
          setFilter={setFilter}
          saved={saved}
          toggleSaved={toggleSaved}
          goProfile={goProfile}
          goChat={goChat}
        />
      ) : (
        <Profile
          artisan={selected}
          saved={saved.includes(selected.id)}
          toggleSaved={() => toggleSaved(selected.id)}
          goChat={() => goChat()}
          back={goHome}
        />
      )}
      {view !== "profile" ? <MobileNav home={goHome} /> : null}
    </div>
  );
}
