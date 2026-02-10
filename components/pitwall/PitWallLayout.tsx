import TrackRails from "./TrackRails";

type PitWallLayoutProps = {
    title: string;
    subtitle?: string;
    rightSlot?: React.ReactNode;
    subheaderSlot?: React.ReactNode;
    children: React.ReactNode;
}

export default function PitWallLayout({
    title,
    subtitle,
    rightSlot,
    subheaderSlot,
    children,
}: PitWallLayoutProps) {
    return (
        <main className="relative min-h-screen bg-zinc-950 text-zinc-50">
            <TrackRails />
            <div className="relative z-10 mx-auto max-w-5xl px-4 py-10">
                <div
                    aria-hidden
                    className="absolute inset-x-0 top-0 h-48 bg-[radial-gradient(70%_60%_at_30%_20%,rgba(239,68,68,0.12),transparent_60%),radial-gradient(70%_60%_at_70%_10%,rgba(16,185,129,0.10),transparent_55%)]"
                />
                <header className="flex items-end justify-between gap-4 z-20">
                    <div>
                        <p className="text-sm text-zinc-400">Pit Wall • Code Telemetry Review</p>
                        <h1 className="mt-1 text-3xl font-semibold tracking-tight">
                            {title}
                            {subtitle ? <span className="text-zinc-400"> - {subtitle}</span> : null}
                        </h1>
                        {subheaderSlot ? <div className="mt-3">{subheaderSlot}</div> : null}
                    </div>

                    {rightSlot ? <div>{rightSlot}</div> : null}
                </header>
                <div className="mt-6 h-px w-full bg-linear-to-r from-transparent via-white/10 to-transparent" />


                <div className="mt-8">{children}</div>

                <footer className="mt-10 text-center text-xs text-zinc-600">
                    Built on a Sunday evening sprint
                </footer>
            </div>
        </main>
    )
}