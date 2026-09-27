import type { ReactNode } from "react";
import { Icon } from "./Icon";

export function AuthShell({
  eyebrow,
  title,
  children,
  switchPrompt,
  switchLabel,
  onSwitch,
  onBack,
}: {
  eyebrow: string;
  title: string;
  children: ReactNode;
  switchPrompt: string;
  switchLabel: string;
  onSwitch: () => void;
  onBack: () => void;
}) {
  return (
    <div className="auth-page">
      <div className="auth-card">
        <button className="auth-back" onClick={onBack}>
          <Icon>arrow_back</Icon> Back
        </button>
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        {children}
        <p className="auth-switch">
          {switchPrompt}{" "}
          <button type="button" onClick={onSwitch}>
            {switchLabel}
          </button>
        </p>
      </div>
    </div>
  );
}
