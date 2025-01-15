import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

type Operation = "+" | "-" | "×" | "÷";

interface Question {
  num1: number;
  num2: number;
  operation: Operation;
  answer: number;
}

interface MathGameProps {
  onWrongAnswer: () => void;
}

const TIME_OPTIONS = [
  { value: "15", label: "15s" },
  { value: "30", label: "30s" },
  { value: "60", label: "60s" },
  { value: "120", label: "120s" },
];

const MathGame = ({ onWrongAnswer }: MathGameProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [selectedTime, setSelectedTime] = useState("60");
  const [score, setScore] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [gameEnded, setGameEnded] = useState(false);
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
    setWrongAnswers(0);
    setTimeLeft(Number(selectedTime));
    setCurrentQuestion(generateQuestion());
    setUserAnswer("");
    setGameEnded(false);
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
      setWrongAnswers((prev) => prev + 1);
      onWrongAnswer();
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
      setGameEnded(true);
      toast({
        title: "Game Over!",
        description: "Check your final statistics below!",
      });
    }

    return () => clearInterval(timer);
  }, [isPlaying, timeLeft, toast]);

  const accuracy = score + wrongAnswers > 0 
    ? Math.round((score / (score + wrongAnswers)) * 100) 
    : 0;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="text-lg font-semibold">Score: {score}</div>
        <div className="text-lg font-semibold">Time: {timeLeft}s</div>
      </div>

      {!isPlaying ? (
        <div className="space-y-4">
          {gameEnded && (
            <div className="p-6 bg-card rounded-lg shadow-sm space-y-2 animate-fade-in">
              <h3 className="text-xl font-bold text-center mb-4">Game Summary</h3>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="space-y-1">
                  <p className="text-muted-foreground">Correct Answers</p>
                  <p className="text-2xl font-bold text-game-correct">{score}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-muted-foreground">Wrong Answers</p>
                  <p className="text-2xl font-bold text-game-wrong">{wrongAnswers}</p>
                </div>
                <div className="col-span-2 space-y-1">
                  <p className="text-muted-foreground">Accuracy</p>
                  <p className="text-2xl font-bold">{accuracy}%</p>
                </div>
              </div>
            </div>
          )}
          <div className="space-y-3">
            <Label>Game Duration</Label>
            <RadioGroup
              value={selectedTime}
              onValueChange={setSelectedTime}
              className="flex flex-wrap gap-4"
            >
              {TIME_OPTIONS.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={option.value} id={`time-${option.value}`} />
                  <Label htmlFor={`time-${option.value}`}>{option.label}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
          <Button onClick={startGame} className="w-full">
            {timeLeft === Number(selectedTime) ? "Start Game" : "Play Again"}
          </Button>
        </div>
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
