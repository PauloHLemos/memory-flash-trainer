import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import MathGame from "@/components/MathGame";
import { useState } from "react";

const MathTrainer = () => {
  const [isWrongAnswer, setIsWrongAnswer] = useState(false);

  return (
    <div className={`min-h-screen p-8 bg-background ${isWrongAnswer ? "animate-wrong-answer" : ""}`}>
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <Link to="/">
            <Button variant="ghost">← Back to Games</Button>
          </Link>
        </div>
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">Math Trainer</h1>
          <p className="text-muted-foreground">
            Improve your mental math skills with rapid-fire calculations. Answer as many questions as you can!
          </p>
        </div>
        <MathGame onWrongAnswer={() => {
          setIsWrongAnswer(true);
          setTimeout(() => setIsWrongAnswer(false), 500);
        }} />
      </div>
    </div>
  );
};

export default MathTrainer;