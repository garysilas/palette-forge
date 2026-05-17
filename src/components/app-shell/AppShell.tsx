"use client";

import { useEffect, useState } from "react";
import { AccessibilityPanel } from "@/components/accessibility/AccessibilityPanel";
import { AdjustmentPanel } from "@/components/adjustments/AdjustmentPanel";
import { ExportPanel } from "@/components/export/ExportPanel";
import { GenerationPanel } from "@/components/generation/GenerationPanel";
import { CollectionsPanel } from "@/components/library/CollectionsPanel";
import { HistoryPanel } from "@/components/library/HistoryPanel";
import { SavedPalettesPanel } from "@/components/library/SavedPalettesPanel";
import { PaletteCanvas } from "@/components/palette/PaletteCanvas";
import { SidePanel } from "@/components/app-shell/SidePanel";
import { StatusBar } from "@/components/app-shell/StatusBar";
import { TopToolbar } from "@/components/app-shell/TopToolbar";

type ThemeMode = "light" | "dark";

export function AppShell() {
  const [themeMode, setThemeMode] = useState<ThemeMode>("dark");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", themeMode === "dark");
  }, [themeMode]);

  return (
    <main className="min-h-screen px-4 py-4 sm:px-6 sm:py-6">
      <div className="shell-glow pointer-events-none fixed inset-0" aria-hidden="true" />
      <div className="mx-auto flex min-h-[calc(100vh-2rem)] max-w-[96rem] flex-col overflow-hidden rounded-[2rem] border border-border/70 bg-panel/90 shadow-[0_32px_120px_rgba(15,23,42,0.28)] backdrop-blur">
        <TopToolbar
          themeMode={themeMode}
          onToggleTheme={() =>
            setThemeMode((currentTheme) =>
              currentTheme === "dark" ? "light" : "dark",
            )
          }
        />
        <div className="grid flex-1 gap-4 p-4 xl:grid-cols-[18rem_minmax(0,1fr)_22rem]">
          <SidePanel
            title="Library"
            description="Generation history, saved systems, and collection placeholders."
          >
            <GenerationPanel />
            <HistoryPanel />
            <CollectionsPanel />
          </SidePanel>
          <PaletteCanvas />
          <SidePanel
            title="Inspector"
            description="Adjustment, accessibility, export, and workspace status."
          >
            <AdjustmentPanel />
            <AccessibilityPanel />
            <ExportPanel />
            <SavedPalettesPanel />
          </SidePanel>
        </div>
        <StatusBar themeMode={themeMode} />
      </div>
    </main>
  );
}
