import { useState } from "react";
import type { AccountPanel } from "../types";
import type { Session } from "../auth/session";
import { Icon } from "./Icon";

export function ProfileMenu({
  session,
  active,
  onOpenAccount,
  onLogin,
  onSignup,
  onLogout,
}: {
  session: Session | null;
  active: boolean;
  onOpenAccount: (panel?: AccountPanel) => void;
  onLogin: () => void;
  onSignup: () => void;
  onLogout: () => void;
}) {
  const [open, setOpen] = useState(false);
  const signedIn = Boolean(session);

  return (
    <div
      className={open ? "profile-menu open" : "profile-menu"}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        className={active ? "active profile-trigger" : "profile-trigger"}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => onOpenAccount()}
      >
        Profile
      </button>
      <div className="profile-dropdown" role="menu">
        {signedIn ? (
          <>
            <p className="profile-dropdown-hello">
              {session?.name}
              <span>{session?.email}</span>
            </p>
            <button
              type="button"
              role="menuitem"
              onClick={() => onOpenAccount("saved")}
            >
              <Icon>favorite</Icon>
              Saved artisans
            </button>
            <button
              type="button"
              role="menuitem"
              onClick={() => onOpenAccount("jobs")}
            >
              <Icon>work</Icon>
              My jobs
            </button>
            <button
              type="button"
              role="menuitem"
              onClick={() => onOpenAccount("settings")}
            >
              <Icon>settings</Icon>
              Account settings
            </button>
            <button
              type="button"
              role="menuitem"
              onClick={() => onOpenAccount("help")}
            >
              <Icon>help</Icon>
              Hiring help
            </button>
            <button type="button" role="menuitem" onClick={onLogout}>
              <Icon>logout</Icon>
              Log out
            </button>
          </>
        ) : (
          <div className="profile-dropdown-guest">
            <p>
              Sign in or create an account to save artisans, post jobs and
              manage your hires.
            </p>
            <button type="button" className="primary" onClick={onLogin}>
              Sign in
            </button>
            <button type="button" className="outline" onClick={onSignup}>
              Create account
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
