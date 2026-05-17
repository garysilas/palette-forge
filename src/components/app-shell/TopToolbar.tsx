type TopToolbarProps = {
  onToggleTheme: () => void;
  themeMode: "light" | "dark";
};

const workspaceActions = [
  { label: "Generate", tone: "primary" },
  { label: "Save Palette", tone: "secondary" },
  { label: "Export", tone: "secondary" },
] as const;

const quickHints = [
  "Space Generate",
  "Cmd/Ctrl+S Save",
  "Cmd/Ctrl+E Export",
];

export function TopToolbar({ onToggleTheme, themeMode }: TopToolbarProps) {
  return (
    <header className="border-b border-border/60 bg-panel/80 px-4 py-4 sm:px-5">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-2">
            <p className="m-0 text-[0.7rem] uppercase tracking-[0.32em] text-slate-500 dark:text-slate-400">
              PaletteForge
            </p>
            <div className="flex flex-col gap-2 xl:flex-row xl:items-end xl:gap-4">
              <h1 className="m-0 font-serif text-3xl leading-none text-foreground sm:text-[2.5rem]">
                Local palette workspace
              </h1>
              <p className="m-0 max-w-xl text-sm text-slate-600 dark:text-slate-300">
                A design-tool shell for harmony generation, contrast review, and export workflows.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {workspaceActions.map((action) => (
              <button
                key={action.label}
                type="button"
                className={
                  action.tone === "primary"
                    ? "rounded-full bg-[linear-gradient(135deg,#143045,#2e6a88)] px-4 py-2 text-sm font-medium text-white shadow-[0_10px_30px_rgba(20,48,69,0.35)] transition hover:translate-y-[-1px]"
                    : "rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition hover:border-accent/60 hover:text-accent"
                }
              >
                {action.label}
              </button>
            ))}
            <button
              type="button"
              aria-label="Toggle theme"
              onClick={onToggleTheme}
              className="rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition hover:border-accent/60 hover:text-accent"
            >
              {themeMode === "dark" ? "Switch to Light" : "Switch to Dark"}
            </button>
          </div>
        </div>
        <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_auto]">
          <div className="grid gap-3 rounded-[1.5rem] border border-border/60 bg-card/70 p-3 md:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-accent/10 px-3 py-1 text-[0.7rem] uppercase tracking-[0.24em] text-accent">
                  Milestone 1 Shell
                </span>
                <span className="rounded-full border border-border px-3 py-1 text-xs text-slate-500 dark:text-slate-400">
                  Single-user local workspace
                </span>
              </div>
              <div className="grid gap-2 text-sm text-slate-600 dark:text-slate-300 sm:grid-cols-3">
                <div className="rounded-2xl border border-border/60 bg-panel px-3 py-2">
                  <div className="text-[0.68rem] uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
                    Harmony
                  </div>
                  <div className="mt-1 font-medium text-foreground">Complementary</div>
                </div>
                <div className="rounded-2xl border border-border/60 bg-panel px-3 py-2">
                  <div className="text-[0.68rem] uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
                    Seed
                  </div>
                  <div className="mt-1 font-medium text-foreground">#264653</div>
                </div>
                <div className="rounded-2xl border border-border/60 bg-panel px-3 py-2">
                  <div className="text-[0.68rem] uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
                    Workspace
                  </div>
                  <div className="mt-1 font-medium text-foreground">Preview shell</div>
                </div>
              </div>
            </div>
            <div className="rounded-[1.25rem] border border-dashed border-border/70 bg-panel px-4 py-3">
              <div className="text-[0.68rem] uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
                Keyboard Hints
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {quickHints.map((hint) => (
                  <span
                    key={hint}
                    className="rounded-full border border-border bg-card px-3 py-1 text-xs text-slate-600 dark:text-slate-300"
                  >
                    {hint}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="rounded-[1.5rem] border border-border/60 bg-card/70 p-3">
            <div className="text-[0.68rem] uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
              Theme Preview
            </div>
            <div className="mt-3 flex items-center gap-3">
              <div className="flex h-11 w-20 items-center rounded-full border border-border bg-panel px-1">
                <span
                  className={`h-9 w-9 rounded-full bg-[linear-gradient(135deg,#f4c46c,#e46f53)] shadow transition-transform ${
                    themeMode === "dark" ? "translate-x-9" : "translate-x-0"
                  }`}
                />
              </div>
              <div>
                <div className="text-sm font-medium text-foreground">
                  {themeMode === "dark" ? "Dark bench active" : "Light bench active"}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  Toggle stays local to this shell preview.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
