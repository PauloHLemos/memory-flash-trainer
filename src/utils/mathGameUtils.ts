import { Question, Operation, Difficulty, CustomRanges, DIFFICULTY_RANGES } from "@/types/mathGame";

export const generateQuestion = (difficulty: Difficulty, customRanges: CustomRanges): Question => {
  const ranges = difficulty === 'custom' ? customRanges : DIFFICULTY_RANGES[difficulty];
  
  // Get available operations based on enabled status in custom mode
  const operations: Operation[] = [];
  if (difficulty !== 'custom' || ranges.addition.enabled) operations.push("+");
  if (difficulty !== 'custom' || ranges.subtraction.enabled) operations.push("-");
  if (difficulty !== 'custom' || ranges.multiplication.enabled) operations.push("×");
  if (difficulty !== 'custom' || ranges.division.enabled) operations.push("÷");

  // If no operations are enabled, default to addition
  if (operations.length === 0) {
    operations.push("+");
  }

  const operation = operations[Math.floor(Math.random() * operations.length)];
  let num1: number, num2: number, answer: number;

  switch (operation) {
    case "+":
      num1 = Math.floor(Math.random() * ranges.addition.max) + 1;
      num2 = Math.floor(Math.random() * ranges.addition.max) + 1;
      answer = num1 + num2;
      break;
    case "-":
      num1 = Math.floor(Math.random() * (ranges.subtraction.max - ranges.subtraction.min + 1)) + ranges.subtraction.min;
      num2 = Math.floor(Math.random() * (ranges.subtraction.min - 1)) + 1;
      answer = num1 - num2;
      break;
    case "×":
      num1 = Math.floor(Math.random() * ranges.multiplication.max) + 1;
      num2 = Math.floor(Math.random() * ranges.multiplication.max) + 1;
      answer = num1 * num2;
      break;
    case "÷":
      num2 = Math.floor(Math.random() * ranges.division.max) + 1;
      answer = Math.floor(Math.random() * ranges.division.max) + 1;
      num1 = num2 * answer;
      break;
    default:
      num1 = 0;
      num2 = 0;
      answer = 0;
  }

  return { num1, num2, operation, answer, generatedAt: Date.now() };
};