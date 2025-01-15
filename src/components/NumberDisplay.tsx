import React from 'react';
import { cn } from "@/lib/utils";

interface NumberDisplayProps {
  number: string | null;
  isShowing: boolean;
}

const NumberDisplay = ({ number, isShowing }: NumberDisplayProps) => {
  return (
    <div className="w-full h-48 flex items-center justify-center bg-gray-50 rounded-lg shadow-inner">
      {isShowing && number ? (
        <span className={cn(
          "text-8xl font-mono text-game-number animate-number-fade",
          "tracking-wider font-semibold"
        )}>
          {number}
        </span>
      ) : (
        <span className="text-6xl animate-pulse">🧠</span>
      )}
    </div>
  );
};

export default NumberDisplay;