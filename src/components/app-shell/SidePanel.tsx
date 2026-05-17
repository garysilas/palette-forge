import type { ReactNode } from "react";

type SidePanelProps = Readonly<{
  title: string;
  children: ReactNode;
}>;

export function SidePanel({ title, children }: SidePanelProps) {
  return (
    <section className="flex min-h-0 flex-col gap-3 rounded-2xl border border-border/80 bg-slate-50/70 p-3 dark:bg-slate-900/60">
      <div className="border-b border-border/70 pb-2">
        <h2 className="m-0 text-sm font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
          {title}
        </h2>
      </div>
      <div className="flex flex-1 flex-col gap-3 overflow-auto">{children}</div>
    </section>
  );
}
