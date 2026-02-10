export default function TrackRails() {
    return (
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute left-0 top-0 hidden h-full w-0 lg:block lg:w-20 xl:w-28">
                <div className="rail rail-down" />
            </div>

            <div className="absolute right-0 top-0 hidden h-full w-0 lg:block lg:w-20 xl:w-28">
                <div className="rail rail-up" />
            </div>

            <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_10%, rgba(255,255,255,0.06),transparent_60%0] pointer-events-none" />
        </div>
    );
}