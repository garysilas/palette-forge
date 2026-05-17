const exportFormats = ["HEX", "RGB", "HSL", "PNG"];

export function ExportPanel() {
  return (
    <section className="rounded-[1.5rem] border border-border/60 bg-panel p-4">
      <div className="flex items-center justify-between">
        <h3 className="m-0 text-sm font-semibold uppercase tracking-[0.16em] text-foreground">
          Export
        </h3>
        <span className="text-xs text-slate-500 dark:text-slate-400">Milestone 6</span>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {exportFormats.map((format) => (
          <span
            key={format}
            className="rounded-full border border-border bg-card px-3 py-1 text-xs uppercase tracking-[0.18em] text-slate-600 dark:text-slate-300"
          >
            {format}
          </span>
        ))}
      </div>
      <p className="mb-0 mt-4 text-sm text-slate-600 dark:text-slate-300">
        The shell now reserves real export real estate without pretending the formatters already exist.
      </p>
    </section>
  );
}
