const savedPaletteRows = [
  { name: "Harbor Signal", meta: "Favorite placeholder" },
  { name: "Copper Thread", meta: "Tagged warm-neutral" },
];

export function SavedPalettesPanel() {
  return (
    <section className="rounded-[1.5rem] border border-border/60 bg-panel p-4">
      <h3 className="m-0 text-sm font-semibold uppercase tracking-[0.16em] text-foreground">
        Saved Palettes
      </h3>
      <div className="mt-4 space-y-2">
        {savedPaletteRows.map((palette) => (
          <div
            key={palette.name}
            className="rounded-2xl border border-border/60 bg-card px-3 py-3"
          >
            <div className="text-sm font-medium text-foreground">{palette.name}</div>
            <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">{palette.meta}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
