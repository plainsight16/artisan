import { useState, type FormEvent } from "react";
import type { Artisan } from "../types";
import type { AuthIntent } from "../auth/gate";
import { authCopy } from "../auth/copy";
import type { Session } from "../auth/session";
import { sessionFromLogin } from "../auth/session";
import { validateCredentials } from "../auth/validate";
import { AuthShell } from "./AuthShell";

export function Login({
  artisan,
  intent,
  onSuccess,
  onSignup,
  onBack,
}: {
  artisan: Artisan;
  intent: AuthIntent;
  onSuccess: (session: Session) => void;
  onSignup: () => void;
  onBack: () => void;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const copy = authCopy(intent, artisan);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const message = validateCredentials(email, password);
    if (message) {
      setError(message);
      return;
    }
    onSuccess(sessionFromLogin(email));
  };

  return (
    <AuthShell
      eyebrow={copy.eyebrow}
      title={copy.loginTitle}
      switchPrompt="New here?"
      switchLabel="Create an account"
      onSwitch={onSignup}
      onBack={onBack}
    >
      <form className="auth-form" onSubmit={submit}>
        {error ? <p role="alert">{error}</p> : null}
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
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button className="primary" type="submit">
          Sign in
        </button>
      </form>
    </AuthShell>
  );
}
