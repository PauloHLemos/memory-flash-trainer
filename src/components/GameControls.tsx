import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
}: GameControlsProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(answer);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <Label>Speed (seconds)</Label>
          <Input
            type="number"
            min="0.5"
            max="3"
            step="0.1"
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            disabled={isPlaying}
            className="w-24"
          />
        </div>
        <div className="space-y-1">
          <Label>Initial Size</Label>
          <Input
            type="number"
            min="1"
            max="10"
            value={initialSize}
            onChange={(e) => setInitialSize(Number(e.target.value))}
            disabled={isPlaying}
            className="w-24"
          />
        </div>
        <div className="text-right">
          <div className="text-sm text-muted-foreground">Score</div>
          <div className="text-2xl font-semibold">{score}</div>
        </div>
      </div>

      {!isPlaying ? (
        <Button onClick={onStart} className="w-full">
          Start Game
        </Button>
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