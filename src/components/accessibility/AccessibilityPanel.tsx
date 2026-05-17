const accessibilityChecks = [
  { label: "AA body text", status: "Pending engine" },
  { label: "AAA large text", status: "Pending engine" },
  { label: "Text preview cards", status: "Shell ready" },
];

export function AccessibilityPanel() {
  return (
    <section className="rounded-[1.5rem] border border-border/60 bg-panel p-4">
      <h3 className="m-0 text-sm font-semibold uppercase tracking-[0.16em] text-foreground">
        Accessibility
      </h3>
      <div className="mt-4 space-y-2">
        {accessibilityChecks.map((check) => (
          <div
            key={check.label}
            className="flex items-center justify-between rounded-2xl border border-border/60 bg-card px-3 py-2 text-sm"
          >
            <span className="text-slate-600 dark:text-slate-300">{check.label}</span>
            <span className="font-medium text-foreground">{check.status}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
