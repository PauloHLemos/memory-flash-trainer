import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, Clock, SortAsc } from "lucide-react";
import { QuestionHistory } from "@/types/mathGame";

interface GameSummaryProps {
  score: number;
  wrongAnswers: number;
  questionHistory: QuestionHistory[];
  gameEnded: boolean;
}

const GameSummary = ({
  score,
  wrongAnswers,
  questionHistory,
  gameEnded
}: GameSummaryProps) => {
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [sortByTime, setSortByTime] = useState(false);

  const accuracy = score + wrongAnswers > 0 
    ? Math.round((score / (score + wrongAnswers)) * 100) 
    : 0;

  const getTimeSpent = (question: QuestionHistory): string => {
    if (!question) return "0.0";
    return ((question.timestamp - question.generatedAt) / 1000).toFixed(1);
  };

  const getSortedHistory = () => {
    if (!sortByTime) return questionHistory;
    
    return [...questionHistory].sort((a, b) => {
      const aTime = parseFloat(getTimeSpent(a));
      const bTime = parseFloat(getTimeSpent(b));
      return bTime - aTime;
    });
  };

  if (!gameEnded) return null;

  return (
    <>
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

      <Collapsible open={isHistoryOpen} onOpenChange={setIsHistoryOpen}>
        <CollapsibleTrigger asChild>
          <Button variant="outline" className="w-full">
            {isHistoryOpen ? "Hide" : "Show"} Question History
            <ChevronDown className={`ml-2 h-4 w-4 transition-transform ${isHistoryOpen ? "rotate-180" : ""}`} />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-2 mt-4">
          <div className="flex justify-end mb-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSortByTime(!sortByTime)}
              className="text-sm"
            >
              {sortByTime ? (
                <>
                  <Clock className="mr-2 h-4 w-4" />
                  Sort by Order
                </>
              ) : (
                <>
                  <SortAsc className="mr-2 h-4 w-4" />
                  Sort by Time
                </>
              )}
            </Button>
          </div>
          {getSortedHistory().map((q, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg ${
                q.isCorrect ? "bg-game-correct/10" : "bg-game-wrong/10"
              }`}
            >
              <div className="flex justify-between items-center">
                <span className="text-lg">
                  {q.num1} {q.operation} {q.num2} = {q.userAnswer}
                </span>
                <div className="text-sm text-muted-foreground">
                  {getTimeSpent(q)}s
                </div>
              </div>
              {!q.isCorrect && (
                <div className="text-sm text-game-wrong mt-1">
                  Correct answer: {q.answer}
                </div>
              )}
            </div>
          ))}
        </CollapsibleContent>
      </Collapsible>
    </>
  );
};

export default GameSummary;
