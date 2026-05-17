import { PLACEHOLDER_SWATCHES } from "@/lib/constants";

const swatchRoles = [
  "Anchor",
  "Bridge",
  "Focus",
  "Warm Lift",
  "Exit Tone",
];

export function PaletteCanvas() {
  return (
    <section className="flex min-h-[38rem] flex-col rounded-[2rem] border border-border/60 bg-panel/85 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]">
      <div className="flex flex-col gap-4 border-b border-border/60 pb-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="m-0 text-[0.68rem] uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
            Palette Stage
          </p>
          <h2 className="m-0 mt-2 font-serif text-4xl leading-none text-foreground">
            Five-swatch composition preview
          </h2>
          <p className="mb-0 mt-3 max-w-2xl text-sm text-slate-600 dark:text-slate-300">
            The shell now behaves like a real workspace: central canvas, clear sidecars, and a theme-aware visual frame ready for the color engine.
          </p>
        </div>
        <div className="grid gap-2 sm:grid-cols-3">
          <div className="rounded-2xl border border-border/60 bg-card px-3 py-2">
            <div className="text-[0.65rem] uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
              Locked
            </div>
            <div className="mt-1 text-sm font-medium text-foreground">1 anchor</div>
          </div>
          <div className="rounded-2xl border border-border/60 bg-card px-3 py-2">
            <div className="text-[0.65rem] uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
              Contrast
            </div>
            <div className="mt-1 text-sm font-medium text-foreground">Preview only</div>
          </div>
          <div className="rounded-2xl border border-border/60 bg-card px-3 py-2">
            <div className="text-[0.65rem] uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
              Export
            </div>
            <div className="mt-1 text-sm font-medium text-foreground">Canvas-ready</div>
          </div>
        </div>
      </div>
      <div className="mt-4 grid flex-1 gap-4 xl:grid-cols-[minmax(0,1fr)_18rem]">
        <div className="grid gap-3 md:grid-cols-5">
          {PLACEHOLDER_SWATCHES.map((swatch, index) => {
            const isFocus = index === 2;

            return (
              <article
                key={swatch.id}
                className={`relative flex min-h-[24rem] flex-col justify-between overflow-hidden rounded-[1.75rem] border border-white/20 p-4 text-white shadow-[0_20px_60px_rgba(15,23,42,0.18)] transition-transform ${
                  isFocus ? "md:-translate-y-3" : ""
                }`}
                style={{ backgroundColor: swatch.hex }}
              >
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.18),rgba(15,23,42,0.16))]" />
                <div className="relative flex items-center justify-between">
                  <span className="rounded-full bg-black/20 px-2.5 py-1 text-[0.68rem] uppercase tracking-[0.18em]">
                    {swatchRoles[index]}
                  </span>
                  <span className="rounded-full bg-black/20 px-2.5 py-1 text-[0.68rem] uppercase tracking-[0.18em]">
                    {swatch.locked ? "Locked" : "Open"}
                  </span>
                </div>
                <div className="relative">
                  <p className="m-0 text-xs uppercase tracking-[0.24em] text-white/70">
                    Swatch {index + 1}
                  </p>
                  <p className="m-0 mt-2 text-3xl font-semibold">{swatch.hex}</p>
                  <p className="mb-0 mt-2 text-sm text-white/70">
                    rgb({swatch.rgb.r}, {swatch.rgb.g}, {swatch.rgb.b})
                  </p>
                </div>
                <div className="relative rounded-[1.25rem] bg-black/15 p-3 backdrop-blur">
                  <div className="text-[0.68rem] uppercase tracking-[0.2em] text-white/70">
                    Preview Copy
                  </div>
                  <div className="mt-2 text-lg font-medium">
                    Design systems need usable value ranges.
                  </div>
                </div>
              </article>
            );
          })}
        </div>
        <aside className="rounded-[1.75rem] border border-border/60 bg-card/80 p-4">
          <div className="text-[0.68rem] uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
            Shell Readout
          </div>
          <div className="mt-4 space-y-3">
            {PLACEHOLDER_SWATCHES.map((swatch, index) => (
              <div
                key={swatch.id}
                className="flex items-center gap-3 rounded-2xl border border-border/60 bg-panel px-3 py-3"
              >
                <span
                  className="h-10 w-10 rounded-2xl border border-white/30 shadow-inner"
                  style={{ backgroundColor: swatch.hex }}
                />
                <div className="min-w-0 flex-1">
                  <div className="text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                    Slot {index + 1}
                  </div>
                  <div className="truncate text-sm font-medium text-foreground">{swatch.hex}</div>
                </div>
                <div className="text-right text-xs text-slate-500 dark:text-slate-400">
                  <div>H {swatch.hsl.h}</div>
                  <div>S {swatch.hsl.s}</div>
                  <div>L {swatch.hsl.l}</div>
                </div>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}
