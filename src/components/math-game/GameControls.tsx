import { Button } from "@/components/ui/button";
import { Difficulty, CustomRanges } from "@/types/mathGame";
import DifficultySelector from "./DifficultySelector";
import CustomRangesForm from "./CustomRangesForm";
import TimeSelector from "./TimeSelector";

interface GameControlsProps {
  difficulty: Difficulty;
  setDifficulty: (difficulty: Difficulty) => void;
  customRanges: CustomRanges;
  setCustomRanges: (ranges: CustomRanges) => void;
  selectedTime: string;
  setSelectedTime: (time: string) => void;
  onStartGame: () => void;
  timeLeft: number;
}

const GameControls = ({
  difficulty,
  setDifficulty,
  customRanges,
  setCustomRanges,
  selectedTime,
  setSelectedTime,
  onStartGame,
  timeLeft,
}: GameControlsProps) => {
  const handleCustomRangeChange = (
    operation: keyof CustomRanges,
    field: 'max' | 'min',
    value: number
  ) => {
    const updatedRanges: CustomRanges = {
      ...customRanges,
      [operation]: {
        ...customRanges[operation],
        [field]: Math.max(1, value)
      }
    };
    setCustomRanges(updatedRanges);
  };

  return (
    <div className="space-y-4">
      <DifficultySelector
        difficulty={difficulty}
        setDifficulty={setDifficulty}
      />

      {difficulty === 'custom' && (
        <CustomRangesForm
          customRanges={customRanges}
          onRangeChange={handleCustomRangeChange}
        />
      )}

      <TimeSelector
        selectedTime={selectedTime}
        setSelectedTime={setSelectedTime}
      />

      <Button onClick={onStartGame} className="w-full">
        {timeLeft === Number(selectedTime) ? "Start Game" : "Play Again"}
      </Button>
    </div>
  );
};

export default GameControls;