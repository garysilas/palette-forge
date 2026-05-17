type StatusBarProps = {
  themeMode: "light" | "dark";
};

export function StatusBar({ themeMode }: StatusBarProps) {
  return (
    <footer className="flex flex-col gap-2 border-t border-border/60 bg-panel/80 px-4 py-3 text-xs text-slate-500 dark:text-slate-400 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full border border-border bg-card px-3 py-1">
          Shell verified for Task 2
        </span>
        <span>Theme: {themeMode}</span>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <span>5 swatches fixed for v1</span>
        <span>Panels wired as Milestone 1 shell</span>
      </div>
    </footer>
  );
}
