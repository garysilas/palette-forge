import { PLACEHOLDER_SWATCHES } from "@/lib/constants";

export function PaletteCanvas() {
  return (
    <section className="flex min-h-[32rem] flex-col rounded-[2rem] border border-border/80 bg-slate-100/70 p-4 dark:bg-slate-900/70">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="m-0 text-xs uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
            Palette Canvas
          </p>
          <h2 className="m-0 text-2xl font-semibold">Five-swatch preview scaffold</h2>
        </div>
        <span className="rounded-full border border-border px-3 py-1 text-xs text-slate-600 dark:text-slate-300">
          Placeholder state
        </span>
      </div>
      <div className="grid flex-1 gap-3 md:grid-cols-5">
        {PLACEHOLDER_SWATCHES.map((swatch, index) => (
          <article
            key={swatch.id}
            className="flex min-h-[20rem] flex-col justify-between rounded-[1.5rem] border border-white/30 p-4 text-white shadow-lg"
            style={{ backgroundColor: swatch.hex }}
          >
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-black/20 px-2 py-1 text-xs">#{index + 1}</span>
              <span className="rounded-full bg-black/20 px-2 py-1 text-xs">
                {swatch.locked ? "Locked" : "Open"}
              </span>
            </div>
            <div>
              <p className="m-0 text-sm uppercase tracking-[0.18em] text-white/70">HEX</p>
              <p className="m-0 text-2xl font-semibold">{swatch.hex}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
