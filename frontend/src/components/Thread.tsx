import type { Artisan } from "../types";
import type { Conversation, ThreadMessage } from "../data/conversations";
import { Icon } from "./Icon";

function Bubble({
  message,
}: {
  message: ThreadMessage;
}) {
  return (
    <div className={message.own ? "bubble own" : "bubble"}>
      <div>
        {message.text ? <p>{message.text}</p> : null}
        {message.image ? (
          <img src={message.image} alt="Sample project" />
        ) : null}
        {message.estimate ? (
          <div className="estimate">
            <div>
              <span>PROJECT ESTIMATE</span>
              <b>{message.estimate.range}</b>
            </div>
            <p>{message.estimate.note}</p>
            <button type="button">
              Approve estimate <Icon>check_circle</Icon>
            </button>
          </div>
        ) : null}
      </div>
      <small>{message.time}</small>
    </div>
  );
}

export function Thread({
  artisan,
  conversation,
  draft,
  setDraft,
  send,
  onBack,
  onViewProfile,
}: {
  artisan: Artisan;
  conversation: Conversation;
  draft: string;
  setDraft: (value: string) => void;
  send: () => void;
  onBack: () => void;
  onViewProfile: () => void;
}) {
  return (
    <section className="thread" aria-label={`Conversation with ${artisan.name}`}>
      <header className="thread-header">
        <button
          className="icon-button thread-back"
          onClick={onBack}
          aria-label="Back to messages"
        >
          <Icon>arrow_back</Icon>
        </button>
        <button
          className="thread-person"
          onClick={onViewProfile}
          aria-label={`View ${artisan.name} profile`}
        >
          <img src={artisan.image} alt="" />
          <div>
            <b>{artisan.name}</b>
            <span>{conversation.job}</span>
          </div>
        </button>
        <button className="outline thread-call" type="button">
          <Icon>call</Icon>
          <span className="thread-call-label">Call artisan</span>
        </button>
      </header>
      <p className="thread-note">
        Agree the scope in writing before paying a deposit.
      </p>
      <div className="thread-log">
        <div className="date">TODAY</div>
        {conversation.messages.map((message) => (
          <Bubble key={message.id} message={message} />
        ))}
      </div>
      <footer className="composer">
        <button className="icon-button" type="button" aria-label="Add attachment">
          <Icon>add</Icon>
        </button>
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="Write a message..."
        />
        <button className="send" onClick={send} aria-label="Send">
          <Icon>send</Icon>
        </button>
      </footer>
    </section>
  );
}
