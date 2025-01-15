import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

type Operation = "+" | "-" | "×" | "÷";

interface Question {
  num1: number;
  num2: number;
  operation: Operation;
  answer: number;
}

const MathGame = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [userAnswer, setUserAnswer] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const generateQuestion = (): Question => {
    const operations: Operation[] = ["+", "-", "×", "÷"];
    const operation = operations[Math.floor(Math.random() * operations.length)];
    let num1: number, num2: number, answer: number;

    switch (operation) {
      case "+":
        num1 = Math.floor(Math.random() * 50) + 1;
        num2 = Math.floor(Math.random() * 50) + 1;
        answer = num1 + num2;
        break;
      case "-":
        num1 = Math.floor(Math.random() * 50) + 26;
        num2 = Math.floor(Math.random() * 25) + 1;
        answer = num1 - num2;
        break;
      case "×":
        num1 = Math.floor(Math.random() * 12) + 1;
        num2 = Math.floor(Math.random() * 12) + 1;
        answer = num1 * num2;
        break;
      case "÷":
        num2 = Math.floor(Math.random() * 12) + 1;
        answer = Math.floor(Math.random() * 12) + 1;
        num1 = num2 * answer;
        break;
      default:
        num1 = 0;
        num2 = 0;
        answer = 0;
    }

    return { num1, num2, operation, answer };
  };

  const startGame = () => {
    setIsPlaying(true);
    setScore(0);
    setTimeLeft(60);
    setCurrentQuestion(generateQuestion());
    setUserAnswer("");
    inputRef.current?.focus();
  };

  const checkAnswer = () => {
    if (!currentQuestion) return;

    const parsedAnswer = parseInt(userAnswer);
    if (parsedAnswer === currentQuestion.answer) {
      setScore((prev) => prev + 1);
      toast({
        description: "Correct! +1 point",
        className: "bg-game-correct text-white",
      });
    } else {
      toast({
        description: `Incorrect! The answer was ${currentQuestion.answer}`,
        className: "bg-game-wrong text-white",
      });
    }

    setCurrentQuestion(generateQuestion());
    setUserAnswer("");
    inputRef.current?.focus();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userAnswer.trim() && isPlaying) {
      checkAnswer();
    }
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isPlaying) {
      setIsPlaying(false);
      toast({
        title: "Game Over!",
        description: `Final score: ${score} points`,
      });
    }

    return () => clearInterval(timer);
  }, [isPlaying, timeLeft, score, toast]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="text-lg font-semibold">Score: {score}</div>
        <div className="text-lg font-semibold">Time: {timeLeft}s</div>
      </div>

      {!isPlaying ? (
        <Button onClick={startGame} className="w-full">
          Start Game
        </Button>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="text-center">
            <div className="text-6xl font-bold mb-4 animate-number-fade">
              {currentQuestion?.num1} {currentQuestion?.operation} {currentQuestion?.num2}
            </div>
          </div>
          <div className="flex gap-2">
            <Input
              ref={inputRef}
              type="number"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Enter your answer"
              className="text-lg"
              autoFocus
            />
            <Button type="submit">Submit</Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default MathGame;