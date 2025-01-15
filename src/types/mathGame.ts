export type Operation = "+" | "-" | "×" | "÷";

export interface Question {
  num1: number;
  num2: number;
  operation: Operation;
  answer: number;
  generatedAt: number;
}

export interface QuestionHistory extends Question {
  userAnswer: number;
  isCorrect: boolean;
  timestamp: number;
}

export interface DifficultyRanges {
  addition: { max: number; enabled?: boolean };
  subtraction: { min: number; max: number; enabled?: boolean };
  multiplication: { max: number; enabled?: boolean };
  division: { max: number; enabled?: boolean };
}

export interface CustomRanges {
  addition: { enabled: boolean; max: number };
  subtraction: { enabled: boolean; min: number; max: number };
  multiplication: { enabled: boolean; max: number };
  division: { enabled: boolean; max: number };
}

export type Difficulty = "easy" | "medium" | "hard" | "custom";

export const DIFFICULTY_RANGES: Record<Exclude<Difficulty, "custom">, DifficultyRanges> = {
  easy: {
    addition: { max: 10 },
    subtraction: { min: 1, max: 10 },
    multiplication: { max: 10 },
    division: { max: 10 },
  },
  medium: {
    addition: { max: 50 },
    subtraction: { min: 1, max: 50 },
    multiplication: { max: 50 },
    division: { max: 50 },
  },
  hard: {
    addition: { max: 100 },
    subtraction: { min: 1, max: 100 },
    multiplication: { max: 100 },
    division: { max: 100 },
  },
};

export const TIME_OPTIONS = [
  { value: "30", label: "30 seconds" },
  { value: "60", label: "1 minute" },
  { value: "120", label: "2 minutes" },
  { value: "300", label: "5 minutes" },
] as const;