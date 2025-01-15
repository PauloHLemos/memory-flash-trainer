import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Difficulty, CustomRanges, TIME_OPTIONS, DIFFICULTY_RANGES } from "@/types/mathGame";

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
  timeLeft
}: GameControlsProps) => {
  const handleCustomRangeChange = (
    operation: keyof CustomRanges,
    field: 'max' | 'min',
    value: number
  ) => {
    setCustomRanges((prev: CustomRanges) => ({
      ...prev,
      [operation]: {
        ...prev[operation],
        [field]: Math.max(1, value)
      }
    }));
  };

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        <Label>Difficulty</Label>
        <RadioGroup
          value={difficulty}
          onValueChange={(value: Difficulty) => setDifficulty(value)}
          className="flex flex-wrap gap-4"
        >
          {Object.keys(DIFFICULTY_RANGES).map((level) => (
            <div key={level} className="flex items-center space-x-2">
              <RadioGroupItem value={level} id={`difficulty-${level}`} />
              <Label htmlFor={`difficulty-${level}`} className="capitalize">
                {level}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {difficulty === 'custom' && (
        <div className="space-y-4 p-4 border rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-sm text-muted-foreground">Addition (max)</Label>
              <Input
                type="number"
                value={customRanges.addition.max}
                onChange={(e) => handleCustomRangeChange('addition', 'max', parseInt(e.target.value))}
                min="1"
                className="mt-1"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm text-muted-foreground">Subtraction</Label>
              <div className="grid grid-cols-2 gap-2">
                <Input
                  type="number"
                  value={customRanges.subtraction.min}
                  onChange={(e) => handleCustomRangeChange('subtraction', 'min', parseInt(e.target.value))}
                  min="1"
                  placeholder="Min"
                />
                <Input
                  type="number"
                  value={customRanges.subtraction.max}
                  onChange={(e) => handleCustomRangeChange('subtraction', 'max', parseInt(e.target.value))}
                  min="1"
                  placeholder="Max"
                />
              </div>
            </div>

            <div>
              <Label className="text-sm text-muted-foreground">Multiplication (max)</Label>
              <Input
                type="number"
                value={customRanges.multiplication.max}
                onChange={(e) => handleCustomRangeChange('multiplication', 'max', parseInt(e.target.value))}
                min="1"
                className="mt-1"
              />
            </div>

            <div>
              <Label className="text-sm text-muted-foreground">Division (max)</Label>
              <Input
                type="number"
                value={customRanges.division.max}
                onChange={(e) => handleCustomRangeChange('division', 'max', parseInt(e.target.value))}
                min="1"
                className="mt-1"
              />
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
      <Button onClick={onStartGame} className="w-full">
        {timeLeft === Number(selectedTime) ? "Start Game" : "Play Again"}
      </Button>
    </div>
  );
};

export default GameControls;