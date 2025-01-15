import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Difficulty, DIFFICULTY_RANGES } from "@/types/mathGame";

interface DifficultySelectorProps {
  difficulty: Difficulty;
  setDifficulty: (difficulty: Difficulty) => void;
}

const DifficultySelector = ({ difficulty, setDifficulty }: DifficultySelectorProps) => {
  return (
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
  );
};

export default DifficultySelector;