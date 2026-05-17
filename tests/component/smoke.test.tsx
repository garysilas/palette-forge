import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { AppShell } from "@/components/app-shell/AppShell";

describe("AppShell scaffold", () => {
  it("renders the placeholder workspace title", () => {
    render(<AppShell />);

    expect(screen.getByText("Local palette workspace")).toBeInTheDocument();
  });
});
