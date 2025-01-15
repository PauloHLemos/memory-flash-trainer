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
    field: 'max' | 'min' | 'enabled',
    value: number | boolean
  ) => {
    setCustomRanges({
      ...customRanges,
      [operation]: {
        ...customRanges[operation],
        [field]: field === 'enabled' ? value : Math.max(1, value as number)
      }
    });
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