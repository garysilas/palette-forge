import type { ReactNode } from "react";

type SidePanelProps = Readonly<{
  children: ReactNode;
  description: string;
  title: string;
}>;

export function SidePanel({ children, description, title }: SidePanelProps) {
  return (
    <section className="flex min-h-0 flex-col rounded-[1.75rem] border border-border/60 bg-card/80 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]">
      <div className="border-b border-border/60 px-1 pb-3">
        <div className="text-[0.68rem] uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
          {title}
        </div>
        <p className="mb-0 mt-2 text-sm text-slate-600 dark:text-slate-300">
          {description}
        </p>
      </div>
      <div className="mt-3 flex flex-1 flex-col gap-3 overflow-auto pr-1">{children}</div>
    </section>
  );
}
