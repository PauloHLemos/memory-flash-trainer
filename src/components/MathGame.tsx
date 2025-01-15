import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { generateQuestion } from "@/utils/mathGameUtils";
import { Question, QuestionHistory, Difficulty, CustomRanges, DIFFICULTY_RANGES } from "@/types/mathGame";
import GameControls from "./math-game/GameControls";
import GamePlay from "./math-game/GamePlay";
import GameSummary from "./math-game/GameSummary";

interface MathGameProps {
  onWrongAnswer: () => void;
}

const MathGame = ({ onWrongAnswer }: MathGameProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [selectedTime, setSelectedTime] = useState("60");
  const [difficulty, setDifficulty] = useState<Difficulty>("medium");
  const [score, setScore] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [gameEnded, setGameEnded] = useState(false);
  const [questionHistory, setQuestionHistory] = useState<QuestionHistory[]>([]);
  const { toast } = useToast();
  const [customRanges, setCustomRanges] = useState<CustomRanges>({
    addition: { max: 1000 },
    subtraction: { min: 501, max: 1000 },
    multiplication: { max: 100 },
    division: { max: 100 }
  });

  const startGame = () => {
    setIsPlaying(true);
    setScore(0);
    setWrongAnswers(0);
    setTimeLeft(Number(selectedTime));
    setCurrentQuestion(generateQuestion(difficulty, customRanges));
    setUserAnswer("");
    setGameEnded(false);
    setQuestionHistory([]);
  };

  const checkAnswer = () => {
    if (!currentQuestion) return;

    const parsedAnswer = parseInt(userAnswer);
    const isCorrect = parsedAnswer === currentQuestion.answer;
    
    setQuestionHistory(prev => [...prev, {
      ...currentQuestion,
      userAnswer: parsedAnswer,
      isCorrect,
      timestamp: Date.now()
    }]);

    if (isCorrect) {
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

    setCurrentQuestion(generateQuestion(difficulty, customRanges));
    setUserAnswer("");
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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="text-lg font-semibold">Score: {score}</div>
        <div className="text-lg font-semibold">Time: {timeLeft}s</div>
      </div>

      {!isPlaying ? (
        <div className="space-y-4">
          <GameSummary
            score={score}
            wrongAnswers={wrongAnswers}
            questionHistory={questionHistory}
            gameEnded={gameEnded}
          />
          <GameControls
            difficulty={difficulty}
            setDifficulty={setDifficulty}
            customRanges={customRanges}
            setCustomRanges={setCustomRanges}
            selectedTime={selectedTime}
            setSelectedTime={setSelectedTime}
            onStartGame={startGame}
            timeLeft={timeLeft}
          />
        </div>
      ) : (
        <GamePlay
          currentQuestion={currentQuestion}
          userAnswer={userAnswer}
          setUserAnswer={setUserAnswer}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default MathGame;