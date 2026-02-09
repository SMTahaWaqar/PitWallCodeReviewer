type CodeInputPanelProps = {
  code: string;
  onCodeChange: (next: string) => void;

  language: string;
  onLanguageChange: (next: string) => void;

  objective: string;
  onObjectiveChange: (next: string) => void;

  onSubmit: () => void;
  isLoading: boolean;
};

const languageOptions = [
  "TypeScript",
  "JavaScript",
  "React",
  "Node.js",
  "NESTJS",
  "MongoDB",
  "Other",
];

export default function CodeInputPanel({
  code,
  onCodeChange,
  language,
  onLanguageChange,
  objective,
  onObjectiveChange,
  onSubmit,
  isLoading,
}: CodeInputPanelProps) {
  const canSubmit = code.trim().length >= 10 && !isLoading;

  return (
    <section className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="flex flex-wrap items-center gap-3">
        <label className="text-sm text-zinc-300">Language</label>

        <div className="relative">
          <select
            value={language}
            onChange={(e) => onLanguageChange(e.target.value)}
            className="appearance-none rounded-xl border border-white/10 bg-zinc-950 px-3 py-2 pr-8 text-sm outline-none cursor-pointer"
          >
            {languageOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>

          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-400">
            ▾
          </span>
        </div>

        <div className="ml-auto text-xs text-zinc-500">
          {code.trim().length}/10 min chars
        </div>
      </div>

      <div className="mt-3">
        <label className="text-sm text-zinc-300">Session objective</label>
        <input
          value={objective}
          onChange={(e) => onObjectiveChange(e.target.value)}
          className="mt-2 w-full rounded-xl border border-white/10 bg-zinc-950 px-3 py-2 text-sm outline-none"
          placeholder="e.g. improve structure, abstraction, and testability"
        />
      </div>

      <div className="mt-3">
        <label className="text-sm text-zinc-300">Code telemetry</label>
        <textarea
          value={code}
          onChange={(e) => onCodeChange(e.target.value)}
          className="mt-2 h-[320px] w-full resize-none rounded-xl border border-white/10 bg-zinc-950 px-3 py-3 font-mono text-sm leading-relaxed outline-none"
          placeholder="Paste code here…"
        />
      </div>

      <button
        onClick={onSubmit}
        disabled={!canSubmit}
        className="mt-4 w-full rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-zinc-950 disabled:opacity-50 cursor-pointer disabled:cursor-default"
      >
        {isLoading ? "Sending to Pit Wall..." : "Send to Pit Wall"}
      </button>

      <p className="mt-3 text-xs text-zinc-500">
        Tip: paste a function, component, service method, or Mongo query.
      </p>
    </section>
  );
}
