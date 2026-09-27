import type { ReactNode } from "react";
import type { Artisan } from "../types";
import { Icon } from "./Icon";

function Bubble({
  own,
  children,
}: {
  own?: boolean;
  children: ReactNode;
}) {
  return (
    <div className={own ? "bubble own" : "bubble"}>
      <div>{children}</div>
      <small>{own ? "09:48 AM" : "09:45 AM"}</small>
    </div>
  );
}

export function Chat({
  artisan,
  messages,
  draft,
  setDraft,
  send,
  back,
}: {
  artisan: Artisan;
  messages: string[];
  draft: string;
  setDraft: (x: string) => void;
  send: () => void;
  back: () => void;
}) {
  return (
    <div className="chat-page">
      <header className="chat-header">
        <button className="icon-button" onClick={back} aria-label="Back to profile">
          <Icon>arrow_back</Icon>
        </button>
        <img src={artisan.image} alt="" />
        <div>
          <b>{artisan.name}</b>
          <span>
            <i /> Online now
          </span>
        </div>
        <button className="icon-button push">
          <Icon>call</Icon>
        </button>
        <button className="icon-button">
          <Icon>more_vert</Icon>
        </button>
      </header>
      <main className="messages">
        <div className="date">TODAY</div>
        <Bubble own>
          Hi {artisan.name.split(" ")[0]}, I need a quote for a project at my
          home in {artisan.location}. Can you help?
        </Bubble>
        <Bubble>
          Good morning! Absolutely — please share a little about what you need
          and I’ll prepare a clear estimate for you.
        </Bubble>
        <Bubble>
          <p>
            I recently completed a similar project. Here’s an idea of the
            quality you can expect.
          </p>
          <img src={artisan.work} alt="Sample project" />
          <div className="estimate">
            <div>
              <span>PROJECT ESTIMATE</span>
              <b>₦450,000 – ₦520,000</b>
            </div>
            <p>
              Includes materials, fabrication and installation. Final price
              depends on your measurements.
            </p>
            <button>
              Approve estimate <Icon>check_circle</Icon>
            </button>
          </div>
        </Bubble>
        {messages.map((message, i) => (
          <Bubble own key={i}>
            {message}
          </Bubble>
        ))}
      </main>
      <footer className="composer">
        <button className="icon-button">
          <Icon>add</Icon>
        </button>
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="Write a message..."
        />
        <button className="send" onClick={send}>
          <Icon>send</Icon>
        </button>
      </footer>
    </div>
  );
}
