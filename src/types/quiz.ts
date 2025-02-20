export type GameState = "start" | "playing" | "end" | "loading";

export interface Question {
  question: string;
  options: string[];
  correct: number;
}