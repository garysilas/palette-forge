const historyEntries = [
  { label: "Complementary", time: "Now" },
  { label: "Monochromatic", time: "Queued" },
  { label: "Shades/Tints", time: "Queued" },
];

export function HistoryPanel() {
  return (
    <section className="rounded-[1.5rem] border border-border/60 bg-panel p-4">
      <h3 className="m-0 text-sm font-semibold uppercase tracking-[0.16em] text-foreground">
        History
      </h3>
      <div className="mt-4 space-y-2">
        {historyEntries.map((entry) => (
          <div
            key={entry.label}
            className="flex items-center justify-between rounded-2xl border border-border/60 bg-card px-3 py-3 text-sm"
          >
            <span className="text-foreground">{entry.label}</span>
            <span className="text-slate-500 dark:text-slate-400">{entry.time}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
