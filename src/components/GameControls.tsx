import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

interface GameControlsProps {
  onStart: () => void;
  onSubmit: (answer: string) => void;
  answer: string;
  setAnswer: (value: string) => void;
  isPlaying: boolean;
  score: number;
  speed: number;
  setSpeed: (value: number) => void;
  initialSize: number;
  setInitialSize: (value: number) => void;
  currentSize: number;
}

const GameControls = ({
  onStart,
  onSubmit,
  answer,
  setAnswer,
  isPlaying,
  score,
  speed,
  setSpeed,
  initialSize,
  setInitialSize,
  currentSize,
}: GameControlsProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(answer);
  };

  const handleInitialSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setInitialSize(Math.max(1, value));
  };

  const isLevelUp = score > 0 && score % 3 === 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <Label>Initial Size</Label>
          <Input
            type="number"
            min="1"
            max="10"
            value={initialSize}
            onChange={handleInitialSizeChange}
            disabled={isPlaying}
            className="w-24 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
        </div>
        <div className="text-right space-y-1">
          <div className="text-sm text-muted-foreground">Score</div>
          <div className="text-2xl font-semibold">{score}</div>
          <div className={cn(
            "text-sm text-muted-foreground transition-all",
            isLevelUp && "animate-bounce text-game-correct"
          )}>
            Length: {currentSize}
            {isLevelUp && " 🎉"}
          </div>
        </div>
      </div>

      {!isPlaying ? (
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label className="text-sm text-muted-foreground">Speed</Label>
              <span className="text-sm text-muted-foreground">{speed}s</span>
            </div>
            <Slider
              value={[speed]}
              onValueChange={(value) => setSpeed(value[0])}
              min={0.5}
              max={3}
              step={0.1}
              className="w-full"
            />
          </div>
          <Button onClick={onStart} className="w-full">
            Start Game
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-2">
          <Input
            type="text"
            placeholder="Enter the number sequence..."
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            pattern="[0-9]*"
            inputMode="numeric"
            autoFocus
          />
          <Button type="submit" className="w-full">
            Submit Answer
          </Button>
        </form>
      )}
    </div>
  );
};

export default GameControls;