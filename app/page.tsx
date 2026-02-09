"use client";

import CodeInputPanel from "@/components/pitwall/CodeInputPanel";
import PitWallLayout from "@/components/pitwall/PitWallLayout";
import ReviewPanel from "@/components/pitwall/ReviewPanel";
import StartingLights from "@/components/pitwall/StartingLights";
import { buildMockReview } from "@/lib/review/mockReview";
import { Review } from "@/lib/review/types";
import { useState } from "react";

export default function Home() {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("TypeScript");
  const [objective, setObjective] = useState("");
  const [review, setReview] = useState<Review | null>(null);
  const [useAI, setUseAI] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit() {
    setIsLoading(true);
    setTimeout(() => {
      setReview(buildMockReview(code))
      setIsLoading(false)
    }, 5200);
  }

  function Pill({ children }: { children: React.ReactNode }) {
    return (
      <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-200">
        {children}
      </span>
    );
  }


  return (
    <PitWallLayout
      title="Pitwall Review"
      subtitle="F1-themed feedback for your code"
      rightSlot={<StartingLights active={isLoading} />}
      subheaderSlot={
        <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-white/10 bg-zinc-950/40 px-3 py-2">
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-medium tracking-wide text-zinc-200">
            SESSION: QUALI ANALYSIS
          </span>
          <button
            type="button"
            onClick={() => setUseAI((v) => !v)}
            className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-200 hover:bg-white/10"
          >
            Mode: <span className="text-zinc-50">{useAI ? "AI" : "Mock"}</span>
          </button>
          <span className="ml-auto text-[11px] text-zinc-400">
            STATUS: <span className="text-zinc-200">LIVE TELEMETRY</span> • v0.1
          </span>

          <Pill>v0.1</Pill>

          <span className="text-xs text-zinc-500">
            {useAI ? "AI will be enabled next" : "Mock mode (instant feedback)"}
          </span>
        </div>
      }
    >
      <div className="grid gap-6 lg:grid-cols-2">
        {/* <section className="rounded-2xl border border-white/10 bg-white/5 p-4">
          Left panel placeholder
        </section> */}
        <CodeInputPanel
          code={code}
          onCodeChange={setCode}
          language={language}
          onLanguageChange={setLanguage}
          objective={objective}
          onObjectiveChange={setObjective}
          onSubmit={handleSubmit}
          isLoading={isLoading}
        />

        <ReviewPanel review={review} />
      </div>
    </PitWallLayout>
  );
}
