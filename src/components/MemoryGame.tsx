import React, { useState, useEffect } from 'react';
import { useToast } from "@/components/ui/use-toast";
import NumberDisplay from './NumberDisplay';
import GameControls from './GameControls';

const generateSequence = (length: number) => {
  return Array.from({ length }, () => Math.floor(Math.random() * 10)).join('');
};

const MemoryGame = () => {
  const [sequence, setSequence] = useState<string>('');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isShowing, setIsShowing] = useState<boolean>(false);
  const [answer, setAnswer] = useState<string>('');
  const [score, setScore] = useState<number>(0);
  const [speed, setSpeed] = useState<number>(1);
  const [initialSize, setInitialSize] = useState<number>(5);
  const [currentSize, setCurrentSize] = useState<number>(5);
  const { toast } = useToast();

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    if (isPlaying && currentIndex < sequence.length) {
      setIsShowing(true);
      timeout = setTimeout(() => {
        setIsShowing(false);
        setCurrentIndex(prev => prev + 1);
      }, speed * 1000);
    }

    return () => clearTimeout(timeout);
  }, [currentIndex, isPlaying, sequence.length, speed]);

  const startGame = () => {
    setCurrentSize(initialSize);
    const newSequence = generateSequence(initialSize);
    setSequence(newSequence);
    setCurrentIndex(0);
    setIsPlaying(true);
    setAnswer('');
  };

  const handleSubmit = (submittedAnswer: string) => {
    if (submittedAnswer === sequence) {
      toast({
        title: "Correct!",
        description: "Well done! Your memory is improving.",
        className: "bg-game-correct text-white",
      });
      setScore(prev => prev + 1);
      
      // Increase sequence size every 3 correct answers
      const newSize = score > 0 && (score + 1) % 3 === 0 
        ? currentSize + 1 
        : currentSize;
      setCurrentSize(newSize);
      
      // Continue with a new sequence immediately
      const newSequence = generateSequence(newSize);
      setSequence(newSequence);
      setCurrentIndex(0);
      setAnswer('');
    } else {
      toast({
        title: "Incorrect",
        description: `The correct sequence was ${sequence}`,
        variant: "destructive",
      });
      setScore(0);
      setIsPlaying(false);
    }
  };

  return (
    <div className="max-w-md mx-auto space-y-8">
      <NumberDisplay
        number={isShowing ? sequence[currentIndex] : null}
        isShowing={isShowing}
      />
      <GameControls
        onStart={startGame}
        onSubmit={handleSubmit}
        answer={answer}
        setAnswer={setAnswer}
        isPlaying={isPlaying}
        score={score}
        speed={speed}
        setSpeed={setSpeed}
        initialSize={initialSize}
        setInitialSize={setInitialSize}
        currentSize={currentSize}
        isShowing={isShowing}
      />
    </div>
  );
};

export default MemoryGame;