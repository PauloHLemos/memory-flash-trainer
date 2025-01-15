export type Operation = "+" | "-" | "×" | "÷";

export interface Question {
  num1: number;
  num2: number;
  operation: Operation;
  answer: number;
  generatedAt: number; // Add this field
}

export interface QuestionHistory extends Question {
  userAnswer: number;
  isCorrect: boolean;
  timestamp: number;
}

export interface DifficultyRanges {
  addition: { max: number };
  subtraction: { min: number; max: number };
  multiplication: { max: number };
  division: { max: number };
}

export interface CustomRanges {
  addition: { enabled: boolean; max: number };
  subtraction: { enabled: boolean; min: number; max: number };
  multiplication: { enabled: boolean; max: number };
  division: { enabled: boolean; max: number };
}

export type Difficulty = "easy" | "medium" | "hard";

export const DIFFICULTY_RANGES: Record<Difficulty, DifficultyRanges> = {
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
