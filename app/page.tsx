"use client";

import CodeInputPanel from "@/components/pitwall/CodeInputPanel";
import PitWallLayout from "@/components/pitwall/PitWallLayout";
import ReviewPanel from "@/components/pitwall/ReviewPanel";
import StartingLights from "@/components/pitwall/StartingLights";
import { buildMockReview } from "@/lib/review/mockReview";
import { Review } from "@/lib/review/types";
import { useState } from "react";

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}


export default function Home() {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("TypeScript");
  const [objective, setObjective] = useState("");
  const [review, setReview] = useState<Review | null>(null);
  const [useAI, setUseAI] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit() {
    setError(null);
    setIsLoading(true);

    try {
      if (!useAI) {
        await wait(2200);
        setReview(buildMockReview(code));
        return;
      }
      await wait(2000);

      const res = await fetch("/api/review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, language, objective }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "AI request failed");

      setReview(data.review);
    } catch (e: any) {
      setError(e?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
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
      title="Pitwall Code Review"
      subtitle="OpenAI x NextJs"
      rightSlot={<StartingLights active={isLoading} />}
      subheaderSlot={
        <div className="relative z-20 flex flex-wrap items-center gap-2 rounded-2xl border border-white/10 bg-zinc-950/40 px-3 py-2">
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-medium tracking-wide text-zinc-200">
            SESSION: QUALI ANALYSIS
          </span>
          <button
            type="button"
            onClick={() => setUseAI((v) => !v)}
            className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-200 hover:bg-white/10 cursor-pointer"
          >
            Mode: <span className="text-zinc-50">{useAI ? "AI" : "Mock"}</span>
          </button>
          <span className="ml-auto text-[11px] text-zinc-400">
            STATUS: <span className="text-zinc-200">LIVE TELEMETRY</span> • v0.1
          </span>

          <Pill>v0.1</Pill>

          <span className="text-xs text-zinc-500">
            {useAI ? "AI is now enabled" : "Mock mode (instant feedback)"}
          </span>
        </div>
      }
    >
      <div className="grid gap-6 lg:grid-cols-2">
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

        <div className="space-y-3">
          <ReviewPanel review={review} />
          {error ? (
            <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-200">
              {error}
            </div>
          ) : null}
        </div>
      </div>
    </PitWallLayout>
  );
}
