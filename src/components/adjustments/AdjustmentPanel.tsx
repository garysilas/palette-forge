const adjustmentRows = [
  { label: "Temperature", value: "+18" },
  { label: "Saturation", value: "+06" },
  { label: "Lightness", value: "-04" },
  { label: "Contrast", value: "+12" },
];

export function AdjustmentPanel() {
  return (
    <section className="rounded-[1.5rem] border border-border/60 bg-panel p-4">
      <h3 className="m-0 text-sm font-semibold uppercase tracking-[0.16em] text-foreground">
        Adjustments
      </h3>
      <div className="mt-4 space-y-3">
        {adjustmentRows.map((row) => (
          <div key={row.label}>
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="text-slate-600 dark:text-slate-300">{row.label}</span>
              <span className="font-medium text-foreground">{row.value}</span>
            </div>
            <div className="h-2 rounded-full bg-card">
              <div className="h-2 w-2/3 rounded-full bg-[linear-gradient(90deg,#2a9d8f,#e9c46a)]" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
