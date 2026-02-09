import { Review } from "./types";

function pickFlags(code: string): Review["flags"] {
  const flags: Review["flags"] = [];

  if (!/try\s*{/.test(code) && /(fetch|axios|db\.|prisma\.)/.test(code)) {
    flags.push({
      level: "yellow",
      text: "External calls detected without obvious error handling.",
    });
  }

  if (/for\s*\(.*\)\s*{[\s\S]*for\s*\(/.test(code)) {
    flags.push({
      level: "yellow",
      text: "Nested loops spotted — check if this can degrade performance on large inputs.",
    });
  }

  if (!/test\(|it\(|describe\(/.test(code) && code.length > 200) {
    flags.push({
      level: "yellow",
      text: "No tests found — add unit tests for core paths + edge cases.",
    });
  }

  if (flags.length === 0) {
    flags.push({
      level: "green",
      text: "No obvious red flags from a quick scan.",
    });
  }

  return flags.slice(0, 3);
}

export function buildMockReview(code: string): Review {
  return {
    summary:
      "Pit Wall summary: the intent is clear, but you can improve separation of concerns and make the code easier to extend.",
    strategy: [
      "Extract repeated logic into named helpers (improves readability).",
      "Split responsibilities: validation → business logic → side-effects.",
      "Name things by intent (what/why) rather than implementation details (how).",
    ],
    reliability: [
      "Add guard clauses for empty/invalid inputs early.",
      "Wrap external calls in try/catch and return typed errors.",
      "Avoid silent failures — bubble up meaningful messages.",
    ],
    performance: [
      "Use early returns to avoid unnecessary work.",
      "Be mindful of loops over large lists; consider indexing/maps where relevant.",
      "Watch for N+1 patterns if this touches DB access.",
    ],
    maintainability: [
      "Write 2–3 unit tests: happy path + one edge + one failure case.",
      "Prefer small pure functions — they’re easier to test and reuse.",
      "Document assumptions (inputs/outputs) near the function boundary.",
    ],
    flags: pickFlags(code),
  };
}
