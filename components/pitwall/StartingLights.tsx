const stepMs = 900;

export default function StartingLights({ active }: { active: boolean }) {
    return (
        <div className="flex items-center gap-2">
            {[0, 1, 2, 3, 4].map((i) => (
                <span
                    key={i}
                    className={[
                        "h-3 w-3 rounded-full border border-white/15",
                        active ? "bg-red-500/40 opacity-40" : "bg-white/10 opacity-30",
                    ].join(" ")}
                    style={
                        active
                            ? {
                                animation: `lightOn 250ms ease-out forwards`,
                                animationDelay: `${i * stepMs}ms`,
                                animationFillMode: "forwards",
                            }
                            : undefined
                    }
                />
            ))}

            <span
                className={[
                    "ml-2 h-2 w-10 rounded-full",
                    active ? "bg-emerald-400/50 opacity-40" : "bg-white/10 opacity-30",
                ].join(" ")}
                style={
                    active
                        ? {
                            animation: "goPulse 1200ms ease-in-out infinite",
                            animationDelay: `${5 * stepMs}ms`,
                        }
                        : undefined
                }
            />
        </div>
    );
}
