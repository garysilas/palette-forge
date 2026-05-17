const collectionRows = ["Brand Drafts", "Editorial Trials", "Accessible Sets"];

export function CollectionsPanel() {
  return (
    <section className="rounded-[1.5rem] border border-border/60 bg-panel p-4">
      <div className="flex items-center justify-between">
        <h3 className="m-0 text-sm font-semibold uppercase tracking-[0.16em] text-foreground">
          Collections
        </h3>
        <span className="rounded-full border border-border bg-card px-2 py-1 text-[0.68rem] text-slate-500 dark:text-slate-400">
          3 planned
        </span>
      </div>
      <div className="mt-4 space-y-2">
        {collectionRows.map((collection) => (
          <div
            key={collection}
            className="rounded-2xl border border-border/60 bg-card px-3 py-3 text-sm text-foreground"
          >
            {collection}
          </div>
        ))}
      </div>
    </section>
  );
}
