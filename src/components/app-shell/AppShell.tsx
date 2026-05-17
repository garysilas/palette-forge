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

export function AppShell() {
  return (
    <main className="min-h-screen p-6">
      <div className="mx-auto flex min-h-[calc(100vh-3rem)] max-w-7xl flex-col rounded-3xl border border-border/80 bg-white/70 shadow-2xl shadow-slate-950/10 backdrop-blur dark:bg-slate-950/70">
        <TopToolbar />
        <div className="grid flex-1 gap-4 p-4 lg:grid-cols-[18rem_minmax(0,1fr)_20rem]">
          <SidePanel title="Workspace">
            <GenerationPanel />
            <HistoryPanel />
            <CollectionsPanel />
          </SidePanel>
          <PaletteCanvas />
          <SidePanel title="Inspector">
            <AdjustmentPanel />
            <AccessibilityPanel />
            <ExportPanel />
            <SavedPalettesPanel />
          </SidePanel>
        </div>
        <StatusBar />
      </div>
    </main>
  );
}
