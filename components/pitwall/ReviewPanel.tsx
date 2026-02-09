import { Review } from "@/lib/review/types";

function FlagPill({
    level,
    text,
}: {
    level: "green" | "yellow" | "red";
    text: string;
}) {
    const cls =
        level === "green"
            ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-200"
            : level === "yellow"
                ? "border-yellow-500/30 bg-yellow-500/10 text-yellow-200"
                : "border-red-500/30 bg-red-500/10 text-red-200";

    const icon = level === "green" ? "🟩" : level === "yellow" ? "🟨" : "🟥";

    return (
        <div
            className={`flex items-start gap-2 rounded-xl border px-3 py-2 text-sm ${cls}`}
        >
            <span className="mt-[1px]">{icon}</span>
            <span className="leading-snug">{text}</span>
        </div>
    );
}

function SectionList({ title, items }: { title: string; items: string[] }) {
    return (
        <div className="rounded-2xl border border-white/10 bg-zinc-950/50 p-4">
            <p className="text-xs text-zinc-400">{title}</p>
            <ul className="mt-2 list-disc spave-y-1 pl-5 text-sm text-zinc-200">
                {items.map((item, i) => (
                    <li key={i}>{item}</li>
                ))}
            </ul>
        </div>
    );
}

export default function ReviewPanel({ review }: { review: Review | null }) {
    return (
        <section className="rounded-2xl border border-white/10 bg-white/5 p-4">
            {!review ? (
                <div className="flex h-full flex-col justify-center rounded-2xl border border-dashed border-white/10 p-6 text-center">
                    <p className="text-zinc-300">Awaiting telemetry...</p>
                    <p className="mt-2 text-sm text-zinc-500">
                        Paste code and send it to the Pit Wall. You'll get Strategy, Reliability, Performance, Maintainability.
                    </p>
                </div>
            ) : (
                <div className="space-y-5">
                    <div className="rounded-2xl border border-white/10 bg-zinc-950/40 p-4">
                        <p className="text-xs text-zinc-400">Pit Wall Summary</p>
                        <p className="mt-2 text-zinc-100">{review.summary}</p>
                    </div>

                    <div className="grid gap-3 md:grid-cols-2">
                        <SectionList title="Strategy (structure)" items={review.strategy} />
                        <SectionList title="Reliability (bugs/edges)" items={review.reliability} />
                        <SectionList title="Performance" items={review.performance} />
                        <SectionList title="Maintainability (tests/refactor)" items={review.maintainability} />
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-zinc-950/40 p-4">
                        <p className="text-xs text-zinc-400">Race Control Flags</p>
                        <div className="mt-3 grid gap-2">
                            {review.flags.map((f, i) => (
                                <FlagPill key={i} level={f.level} text={f.text} />
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}