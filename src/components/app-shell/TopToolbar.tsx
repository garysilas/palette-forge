const toolbarItems = [
  "Generate",
  "Harmony",
  "Seed",
  "Save",
  "Export",
  "Theme",
];

export function TopToolbar() {
  return (
    <header className="flex flex-wrap items-center justify-between gap-3 border-b border-border/80 px-4 py-4">
      <div>
        <p className="text-xs uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
          PaletteForge
        </p>
        <h1 className="m-0 text-xl font-semibold">Local palette workspace</h1>
      </div>
      <nav className="flex flex-wrap gap-2">
        {toolbarItems.map((item) => (
          <button
            key={item}
            type="button"
            className="rounded-full border border-border bg-white px-3 py-1.5 text-sm text-slate-700 transition hover:border-slate-400 hover:bg-slate-50 dark:bg-slate-900 dark:text-slate-100"
          >
            {item}
          </button>
        ))}
      </nav>
    </header>
  );
}
