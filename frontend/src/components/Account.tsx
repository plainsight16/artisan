import { useState } from "react";
import type { AccountPanel, Artisan } from "../types";
import type { Session } from "../auth/session";
import { artisans } from "../data/artisans";
import { Icon } from "./Icon";

const PANELS: { id: AccountPanel; label: string; icon: string }[] = [
  { id: "saved", label: "Saved artisans", icon: "favorite" },
  { id: "jobs", label: "My jobs", icon: "work" },
  { id: "help", label: "Hiring help", icon: "help" },
  { id: "settings", label: "Account settings", icon: "settings" },
];

export function Account({
  session,
  panel,
  saved,
  setPanel,
  goProfile,
  onLogout,
}: {
  session: Session;
  panel: AccountPanel;
  saved: number[];
  setPanel: (panel: AccountPanel) => void;
  goProfile: (artisan: Artisan) => void;
  onLogout: () => void;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const savedArtisans = artisans.filter((a) => saved.includes(a.id));
  const initial = session.name.trim().charAt(0).toUpperCase() || "A";
  const choosePanel = (next: AccountPanel) => {
    setPanel(next);
    setMenuOpen(false);
  };

  return (
    <main className="account">
      <aside className={menuOpen ? "account-card open" : "account-card"}>
        <div className="account-identity">
          <div className="account-avatar" aria-hidden="true">
            {initial}
          </div>
          <div className="account-identity-copy">
            <h1>{session.name}</h1>
            <p className="account-email">{session.email}</p>
          </div>
          <button
            className="account-menu-toggle"
            aria-expanded={menuOpen}
            aria-controls="account-menu"
            aria-label={menuOpen ? "Close account menu" : "Open account menu"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <Icon>{menuOpen ? "close" : "menu"}</Icon>
          </button>
          <button
            className="account-settings-icon"
            aria-label="Account settings"
            onClick={() => choosePanel("settings")}
          >
            <Icon>settings</Icon>
          </button>
        </div>
        <div className="account-card-body" id="account-menu">
          <p className="place">
            <Icon>location_on</Icon>
            Lagos
          </p>
          <button className="account-phone" onClick={() => choosePanel("settings")}>
            Add a phone number
          </button>
          <nav className="account-links">
            {PANELS.map((item) => (
              <button
                key={item.id}
                className={panel === item.id ? "active" : ""}
                onClick={() => choosePanel(item.id)}
              >
                <Icon>{item.icon}</Icon>
                {item.label}
              </button>
            ))}
          </nav>
          <button className="account-logout" onClick={onLogout}>
            <Icon>logout</Icon>
            Log out
          </button>
        </div>
      </aside>
      <section className="account-panel">
        {panel === "saved" ? (
          <SavedPanel artisans={savedArtisans} goProfile={goProfile} />
        ) : null}
        {panel === "jobs" ? <JobsPanel /> : null}
        {panel === "settings" ? <SettingsPanel session={session} /> : null}
        {panel === "help" ? <HelpPanel /> : null}
      </section>
    </main>
  );
}

function SavedPanel({
  artisans,
  goProfile,
}: {
  artisans: Artisan[];
  goProfile: (artisan: Artisan) => void;
}) {
  return (
    <>
      <h2>Saved artisans</h2>
      {artisans.length === 0 ? (
        <p className="account-empty">
          You haven’t saved anyone yet. Heart a verified professional on Explore
          and they’ll appear here when you’re ready to hire.
        </p>
      ) : (
        <ul className="account-saved">
          {artisans.map((artisan) => (
            <li key={artisan.id}>
              <img src={artisan.image} alt="" />
              <div>
                <b>{artisan.name}</b>
                <span>
                  {artisan.trade} · {artisan.location}
                </span>
              </div>
              <button className="outline" onClick={() => goProfile(artisan)}>
                View
              </button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

function JobsPanel() {
  return (
    <>
      <h2>My jobs</h2>
      <p className="account-empty">
        You haven’t posted a job yet. When you need a carpenter, welder, plumber
        or other trade, a job here is how nearby artisans send quotes.
      </p>
    </>
  );
}

function SettingsPanel({ session }: { session: Session }) {
  return (
    <>
      <h2>Account settings</h2>
      <dl className="account-settings">
        <div>
          <dt>Name</dt>
          <dd>{session.name}</dd>
        </div>
        <div>
          <dt>Email</dt>
          <dd>{session.email}</dd>
        </div>
        <div>
          <dt>City</dt>
          <dd>Lagos</dd>
        </div>
        <div>
          <dt>Phone</dt>
          <dd>
            Not added — artisans you chat with can only reach you in-app until
            you add one.
          </dd>
        </div>
      </dl>
    </>
  );
}

function HelpPanel() {
  return (
    <>
      <h2>Hiring help</h2>
      <p>
        Artisan lists verified local tradespeople. Compare ratings, look through
        completed work, then start a conversation when you’re ready for a quote.
      </p>
      <p>
        Saving a professional keeps them on this page. Identity checks and
        response times live on each artisan’s public profile.
      </p>
    </>
  );
}
