export type Operation = "+" | "-" | "×" | "÷";
export type Difficulty = "easy" | "medium" | "hard" | "custom";

export interface Question {
  num1: number;
  num2: number;
  operation: Operation;
  answer: number;
}

export interface QuestionHistory extends Question {
  userAnswer: number;
  isCorrect: boolean;
  timestamp: number;
}

export interface CustomRanges {
  addition: { max: number };
  subtraction: { min: number; max: number };
  multiplication: { max: number };
  division: { max: number };
}

export const TIME_OPTIONS = [
  { value: "15", label: "15s" },
  { value: "30", label: "30s" },
  { value: "60", label: "60s" },
  { value: "120", label: "120s" },
];

export const DIFFICULTY_RANGES = {
  easy: {
    addition: { max: 20 },
    subtraction: { min: 11, max: 20 },
    multiplication: { max: 10 },
    division: { max: 10 }
  },
  medium: {
    addition: { max: 1000 },
    subtraction: { min: 501, max: 1000 },
    multiplication: { max: 100 },
    division: { max: 100 }
  },
  hard: {
    addition: { max: 10000 },
    subtraction: { min: 5001, max: 10000 },
    multiplication: { max: 1000 },
    division: { max: 1000 }
  },
  custom: {
    addition: { max: 1000 },
    subtraction: { min: 501, max: 1000 },
    multiplication: { max: 100 },
    division: { max: 100 }
  }
};