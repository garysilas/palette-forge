const harmonyModes = ["Complementary", "Monochromatic", "Shades/Tints"];

export function GenerationPanel() {
  return (
    <section className="rounded-[1.5rem] border border-border/60 bg-panel p-4">
      <div className="flex items-center justify-between">
        <h3 className="m-0 text-sm font-semibold uppercase tracking-[0.16em] text-foreground">
          Generation
        </h3>
        <span className="rounded-full bg-accent/10 px-2 py-1 text-[0.68rem] uppercase tracking-[0.18em] text-accent">
          Shell
        </span>
      </div>
      <div className="mt-4 grid gap-2">
        {harmonyModes.map((mode, index) => (
          <div
            key={mode}
            className={`rounded-2xl border px-3 py-3 text-sm ${
              index === 0
                ? "border-accent/50 bg-accent/10 text-foreground"
                : "border-border/60 bg-card text-slate-600 dark:text-slate-300"
            }`}
          >
            {mode}
          </div>
        ))}
      </div>
      <div className="mt-4 rounded-2xl border border-dashed border-border/70 px-3 py-3 text-sm text-slate-600 dark:text-slate-300">
        Seed swatch, harmony controls, and regenerate behavior land in Milestone 3. This panel now reads like a real control stack instead of placeholder copy.
      </div>
    </section>
  );
}
