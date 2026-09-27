import { useState, type FormEvent } from "react";
import type { Artisan } from "../types";
import type { Session } from "../auth/session";
import { sessionFromSignup } from "../auth/session";
import { validateSignup } from "../auth/validate";
import { AuthShell } from "./AuthShell";

export function Signup({
  artisan,
  onSuccess,
  onLogin,
  onBack,
}: {
  artisan: Artisan;
  onSuccess: (session: Session) => void;
  onLogin: () => void;
  onBack: () => void;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const message = validateSignup(name, email, password);
    if (message) {
      setError(message);
      return;
    }
    onSuccess(sessionFromSignup(name, email));
  };

  return (
    <AuthShell
      eyebrow="TO CONTINUE YOUR CONVERSATION"
      title={`Create an account to chat with ${artisan.name}`}
      switchPrompt="Already have an account?"
      switchLabel="Sign in instead"
      onSwitch={onLogin}
      onBack={onBack}
    >
      <form className="auth-form" onSubmit={submit}>
        {error ? <p role="alert">{error}</p> : null}
        <label className="auth-field">
          Name
          <input
            type="text"
            name="name"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label className="auth-field">
          Email
          <input
            type="email"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label className="auth-field">
          Password
          <input
            type="password"
            name="password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button className="primary" type="submit">
          Create account
        </button>
      </form>
    </AuthShell>
  );
}
