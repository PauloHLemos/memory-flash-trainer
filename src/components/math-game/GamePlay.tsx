import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Question } from "@/types/mathGame";

interface GamePlayProps {
  currentQuestion: Question | null;
  userAnswer: string;
  setUserAnswer: (answer: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const GamePlay = ({
  currentQuestion,
  userAnswer,
  setUserAnswer,
  onSubmit
}: GamePlayProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <form onSubmit={onSubmit} className="space-y-4">
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
          className="text-lg [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          autoFocus
        />
        <Button type="submit">Submit</Button>
      </div>
    </form>
  );
};

export default GamePlay;