import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { AppShell } from "@/components/app-shell/AppShell";

describe("AppShell shell", () => {
  it("renders the workspace title and theme control", () => {
    render(<AppShell />);

    expect(screen.getByText("Local palette workspace")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Toggle theme" })).toBeInTheDocument();
  });
});
