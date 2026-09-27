import { useState } from "react";
import "./index.css";
import "./App.css";
import type { Artisan, View } from "./types";
import { artisans, filterArtisans } from "./data/artisans";
import type { ChatIntent } from "./auth/gate";
import {
  isAuthReachable,
  viewAfterAuthSuccess,
  viewForChatIntent,
} from "./auth/gate";
import type { Session } from "./auth/session";
import { loadSession, saveSession } from "./auth/session";
import { Header } from "./components/Header";
import { Home } from "./components/Home";
import { Profile } from "./components/Profile";
import { Chat } from "./components/Chat";
import { Login } from "./components/Login";
import { Signup } from "./components/Signup";
import { MobileNav } from "./components/MobileNav";

export default function App() {
  const [view, setView] = useState<View>("home");
  const [selected, setSelected] = useState<Artisan>(artisans[0]);
  const [filter, setFilter] = useState("All Trades");
  const [saved, setSaved] = useState<number[]>([]);
  const [messages, setMessages] = useState<string[]>([]);
  const [draft, setDraft] = useState("");
  const [session, setSession] = useState<Session | null>(() => loadSession());
  const [intent, setIntent] = useState<ChatIntent>(null);
  const [returnView, setReturnView] = useState<"home" | "profile">("home");
  const filtered = filterArtisans(filter);
  const showAuth =
    (view === "login" || view === "signup") && isAuthReachable(intent);
  const shellView = view === "profile" ? "profile" : "home";

  const goHome = () => setView("home");
  const goProfile = (artisan: Artisan) => {
    setSelected(artisan);
    setView("profile");
    window.scrollTo(0, 0);
  };
  const goChat = (artisan = selected) => {
    setSelected(artisan);
    setReturnView(view === "profile" ? "profile" : "home");
    window.scrollTo(0, 0);
    const next = viewForChatIntent(session);
    if (next === "login") setIntent("chat");
    setView(next);
  };
  const finishAuth = (nextSession: Session) => {
    const next = viewAfterAuthSuccess(intent);
    saveSession(nextSession);
    setSession(nextSession);
    setView(next);
    setIntent(null);
    window.scrollTo(0, 0);
  };
  const cancelAuth = () => {
    setIntent(null);
    setView(returnView);
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
  if (showAuth)
    return view === "signup" ? (
      <Signup
        artisan={selected}
        onSuccess={finishAuth}
        onLogin={() => setView("login")}
        onBack={cancelAuth}
      />
    ) : (
      <Login
        artisan={selected}
        onSuccess={finishAuth}
        onSignup={() => setView("signup")}
        onBack={cancelAuth}
      />
    );
  return (
    <div className="app-shell">
      <Header view={shellView} home={goHome} />
      {view === "profile" ? (
        <Profile
          artisan={selected}
          saved={saved.includes(selected.id)}
          toggleSaved={() => toggleSaved(selected.id)}
          goChat={() => goChat()}
          back={goHome}
        />
      ) : (
        <Home
          artisans={filtered}
          filter={filter}
          setFilter={setFilter}
          saved={saved}
          toggleSaved={toggleSaved}
          goProfile={goProfile}
          goChat={goChat}
        />
      )}
      {view !== "profile" ? <MobileNav home={goHome} /> : null}
    </div>
  );
}
