import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import App from "./App";

function chatButtons() {
  return screen.getAllByRole("button", { name: "Chat" });
}

describe("gated login and signup", () => {
  beforeEach(() => {
    localStorage.clear();
    window.scrollTo = () => {};
  });

  afterEach(() => {
    cleanup();
  });

  it("keeps explore public and does not offer login or signup on its own", () => {
    render(<App />);

    expect(
      screen.getByRole("heading", { name: /Verified artisans/i }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: /Sign in to chat/i }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: /Create an account to chat/i }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: /Sign in to view your profile/i }),
    ).not.toBeInTheDocument();
  });

  it("opens login instead of chat when a guest commits to messaging an artisan", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(chatButtons()[0]);

    expect(
      screen.getByRole("heading", {
        name: "Sign in to chat with Tunde's Woodworks",
      }),
    ).toBeInTheDocument();
    expect(screen.queryByPlaceholderText("Write a message...")).toBeNull();
  });

  it("lets the guest switch to signup only after that chat commitment", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(chatButtons()[0]);
    await user.click(screen.getByRole("button", { name: "Create an account" }));

    expect(
      screen.getByRole("heading", {
        name: "Create an account to chat with Tunde's Woodworks",
      }),
    ).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Sign in instead" }));
    expect(
      screen.getByRole("heading", {
        name: "Sign in to chat with Tunde's Woodworks",
      }),
    ).toBeInTheDocument();
  });

  it("returns to explore when the guest backs out of login", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(chatButtons()[0]);
    await user.click(screen.getByRole("button", { name: "Back" }));

    expect(
      screen.getByRole("heading", { name: /Verified artisans/i }),
    ).toBeInTheDocument();
  });

  it("continues into the artisan chat after a successful login", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(chatButtons()[0]);
    await user.type(screen.getByLabelText("Email"), "ada@example.com");
    await user.type(screen.getByLabelText("Password"), "password1");
    await user.click(screen.getByRole("button", { name: "Sign in" }));

    expect(screen.getByPlaceholderText("Write a message...")).toBeInTheDocument();
    expect(screen.getByText("Tunde's Woodworks")).toBeInTheDocument();
  });

  it("continues into chat after signup from a profile conversation", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("img", { name: "Bisi Welding" }));
    await user.click(
      screen.getByRole("button", { name: /Start a conversation/ }),
    );
    await user.click(screen.getByRole("button", { name: "Create an account" }));
    await user.type(screen.getByLabelText("Name"), "Ada");
    await user.type(screen.getByLabelText("Email"), "ada@example.com");
    await user.type(screen.getByLabelText("Password"), "password1");
    await user.click(screen.getByRole("button", { name: "Create account" }));

    expect(screen.getByPlaceholderText("Write a message...")).toBeInTheDocument();
    expect(screen.getByText("Bisi Welding")).toBeInTheDocument();
  });

  it("skips auth on the next chat once the session exists", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(chatButtons()[0]);
    await user.type(screen.getByLabelText("Email"), "ada@example.com");
    await user.type(screen.getByLabelText("Password"), "password1");
    await user.click(screen.getByRole("button", { name: "Sign in" }));
    await user.click(screen.getByRole("button", { name: "Back to profile" }));
    await user.click(screen.getAllByRole("button", { name: "Explore" })[0]);
    await user.click(chatButtons()[1]);

    expect(screen.getByPlaceholderText("Write a message...")).toBeInTheDocument();
    expect(screen.getByText("Bisi Welding")).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: /Sign in to chat/i }),
    ).not.toBeInTheDocument();
  });

  it("shows a validation alert instead of opening chat", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(chatButtons()[0]);
    await user.click(screen.getByRole("button", { name: "Sign in" }));

    expect(screen.getByRole("alert")).toHaveTextContent(
      "Enter a valid email address.",
    );
    expect(screen.queryByPlaceholderText("Write a message...")).toBeNull();
  });
});

describe("account profile", () => {
  beforeEach(() => {
    localStorage.clear();
    window.scrollTo = () => {};
  });

  afterEach(() => {
    cleanup();
  });

  function profileButtons() {
    return screen.getAllByRole("button", { name: "Profile" });
  }

  it("shows a sign-in prompt in the profile dropdown for guests", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.hover(profileButtons()[0]);

    expect(
      screen.getByText(/Sign in or create an account to save artisans/i),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Sign in" })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Create account" }),
    ).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Saved artisans" })).toBeNull();
  });

  it("opens login instead of the account page when a guest clicks Profile", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(profileButtons()[0]);

    expect(
      screen.getByRole("heading", { name: "Sign in to view your profile" }),
    ).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Saved artisans" })).toBeNull();
  });

  it("opens signup from the guest profile dropdown", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.hover(profileButtons()[0]);
    await user.click(screen.getByRole("button", { name: "Create account" }));

    expect(
      screen.getByRole("heading", {
        name: "Create an account to hire with confidence",
      }),
    ).toBeInTheDocument();
  });

  it("shows the account workspace after signing in from Profile", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(profileButtons()[0]);
    await user.type(screen.getByLabelText("Email"), "ada@example.com");
    await user.type(screen.getByLabelText("Password"), "password1");
    await user.click(screen.getByRole("button", { name: "Sign in" }));

    expect(screen.getByRole("heading", { name: "ada" })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Saved artisans" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/You haven’t saved anyone yet/i),
    ).toBeInTheDocument();
  });

  it("lists a saved artisan on the account page", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(
      screen.getByRole("button", { name: "Save Tunde's Woodworks" }),
    );
    await user.click(profileButtons()[0]);
    await user.type(screen.getByLabelText("Email"), "ada@example.com");
    await user.type(screen.getByLabelText("Password"), "password1");
    await user.click(screen.getByRole("button", { name: "Sign in" }));

    expect(screen.getByText("Tunde's Woodworks")).toBeInTheDocument();
    expect(
      screen.queryByText(/You haven’t saved anyone yet/i),
    ).not.toBeInTheDocument();
  });

  it("returns to explore after logout", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(profileButtons()[0]);
    await user.type(screen.getByLabelText("Email"), "ada@example.com");
    await user.type(screen.getByLabelText("Password"), "password1");
    await user.click(screen.getByRole("button", { name: "Sign in" }));
    await user.click(screen.getByRole("button", { name: "Open account menu" }));
    await user.click(screen.getByRole("button", { name: "Log out" }));

    expect(
      screen.getByRole("heading", { name: /Verified artisans/i }),
    ).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Saved artisans" })).toBeNull();
  });

  it("lets the account menu open a section then hide again", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(profileButtons()[0]);
    await user.type(screen.getByLabelText("Email"), "ada@example.com");
    await user.type(screen.getByLabelText("Password"), "password1");
    await user.click(screen.getByRole("button", { name: "Sign in" }));
    await user.click(screen.getByRole("button", { name: "Open account menu" }));
    await user.click(screen.getByRole("button", { name: "My jobs" }));

    expect(screen.getByRole("heading", { name: "My jobs" })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Open account menu" }),
    ).toHaveAttribute("aria-expanded", "false");
  });
});
