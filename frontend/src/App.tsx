import { useState } from "react";
import "./index.css";
import "./App.css";
import type { AccountPanel, Artisan, View } from "./types";
import { artisans, filterArtisans } from "./data/artisans";
import type { AuthIntent } from "./auth/gate";
import {
  isAuthReachable,
  viewAfterAuthSuccess,
  viewForAccountIntent,
  viewForChatIntent,
} from "./auth/gate";
import type { Session } from "./auth/session";
import { clearSession, loadSession, saveSession } from "./auth/session";
import { Header } from "./components/Header";
import { Home } from "./components/Home";
import { Profile } from "./components/Profile";
import { Account } from "./components/Account";
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
  const [intent, setIntent] = useState<AuthIntent>(null);
  const [returnView, setReturnView] = useState<"home" | "profile" | "account">(
    "home",
  );
  const [accountPanel, setAccountPanel] = useState<AccountPanel>("saved");
  const filtered = filterArtisans(filter);
  const showAuth =
    (view === "login" || view === "signup") && isAuthReachable(intent);
  const shellView =
    view === "account" ? "account" : view === "profile" ? "profile" : "home";

  const rememberReturn = () => {
    if (view === "profile" || view === "account" || view === "home") {
      setReturnView(view);
    }
  };
  const goHome = () => setView("home");
  const goProfile = (artisan: Artisan) => {
    setSelected(artisan);
    setView("profile");
    window.scrollTo(0, 0);
  };
  const goChat = (artisan = selected) => {
    setSelected(artisan);
    rememberReturn();
    window.scrollTo(0, 0);
    const next = viewForChatIntent(session);
    if (next === "login") setIntent("chat");
    setView(next);
  };
  const goAccount = (panel: AccountPanel = "saved") => {
    rememberReturn();
    window.scrollTo(0, 0);
    const next = viewForAccountIntent(session);
    if (next === "login") {
      setIntent("account");
      setView("login");
      return;
    }
    setAccountPanel(panel);
    setView("account");
  };
  const startAccountAuth = (mode: "login" | "signup") => {
    rememberReturn();
    window.scrollTo(0, 0);
    setIntent("account");
    setView(mode);
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
  const logout = () => {
    clearSession();
    setSession(null);
    setIntent(null);
    setView("home");
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
        intent={intent}
        onSuccess={finishAuth}
        onLogin={() => setView("login")}
        onBack={cancelAuth}
      />
    ) : (
      <Login
        artisan={selected}
        intent={intent}
        onSuccess={finishAuth}
        onSignup={() => setView("signup")}
        onBack={cancelAuth}
      />
    );
  return (
    <div className="app-shell">
      <Header
        view={shellView}
        home={goHome}
        session={session}
        onOpenAccount={goAccount}
        onLogin={() => startAccountAuth("login")}
        onSignup={() => startAccountAuth("signup")}
        onLogout={logout}
      />
      {view === "profile" ? (
        <Profile
          artisan={selected}
          saved={saved.includes(selected.id)}
          toggleSaved={() => toggleSaved(selected.id)}
          goChat={() => goChat()}
          back={goHome}
        />
      ) : view === "account" && session ? (
        <Account
          session={session}
          panel={accountPanel}
          saved={saved}
          setPanel={setAccountPanel}
          goProfile={goProfile}
          onLogout={logout}
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
      {view !== "profile" ? (
        <MobileNav view={shellView} home={goHome} goAccount={() => goAccount()} />
      ) : null}
    </div>
  );
}
