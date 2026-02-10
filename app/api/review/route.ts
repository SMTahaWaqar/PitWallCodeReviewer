import { NextResponse } from "next/server";
import OpenAI from "openai";
import { zodTextFormat } from "openai/helpers/zod";
import z from "zod";

const ReviewSchema = z.object({
  summary: z.string(),
  strategy: z.array(z.string()),
  reliability: z.array(z.string()),
  performance: z.array(z.string()),
  maintainability: z.array(z.string()),
  flags: z.array(
    z.object({
      level: z.enum(["green", "yellow", "red"]),
      text: z.string(),
    }),
  ),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { code, language, objective } = body ?? {};

    if (!code || typeof code !== "string" || code.trim().length < 10) {
      return NextResponse.json(
        { error: "Paste at least 10 characters of code" },
        { status: 400 },
      );
    }

    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const model = process.env.OPENAI_MODEL || "gpt-4o-mini";

    const response = await client.responses.parse({
      model,
      input: [
        {
          role: "system",
          content:
            "You are a Formula 1 race engineer reviewing code telemetry. Give senior-level, actionable feedback. Be concise. Return concrete suggestions, not generic advice.",
        },
        {
          role: "user",
          content:
            `Language: ${language ?? "unspecified"}\n` +
            `Objective: ${objective ?? "Review structure, abstraction, scalability."}\n\n` +
            `CODE:\n${code}`,
        },
      ],
      text: {
        format: zodTextFormat(ReviewSchema, "review"),
      },
    });

    const review = JSON.parse(response.output_text);

    return NextResponse.json({ mode: "ai", review });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Server error", detail: error?.message ?? String(error) },
      { status: 500 },
    );
  }
}
