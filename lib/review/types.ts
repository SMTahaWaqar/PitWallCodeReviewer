export type FlagLevel = "green" | "yellow" | "red";

export type ReviewFlag = {
  level: FlagLevel;
  text: string;
};

export type Review = {
  summary: string;
  strategy: string[];
  reliability: string[];
  performance: string[];
  maintainability: string[];
  flags: ReviewFlag[];
};
