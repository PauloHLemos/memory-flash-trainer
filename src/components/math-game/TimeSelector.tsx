import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { TIME_OPTIONS } from "@/types/mathGame";

interface TimeSelectorProps {
  selectedTime: string;
  setSelectedTime: (time: string) => void;
}

const TimeSelector = ({ selectedTime, setSelectedTime }: TimeSelectorProps) => {
  return (
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
  );
};

export default TimeSelector;