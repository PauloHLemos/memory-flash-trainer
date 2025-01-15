import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { CustomRanges } from "@/types/mathGame";

interface CustomRangesFormProps {
  customRanges: CustomRanges;
  onRangeChange: (operation: keyof CustomRanges, field: 'max' | 'min', value: number) => void;
}

const CustomRangesForm = ({ customRanges, onRangeChange }: CustomRangesFormProps) => {
  return (
    <div className="space-y-4 p-4 border rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label className="text-sm text-muted-foreground">Addition (max)</Label>
          <Input
            type="number"
            value={customRanges.addition.max}
            onChange={(e) => onRangeChange('addition', 'max', parseInt(e.target.value))}
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
              onChange={(e) => onRangeChange('subtraction', 'min', parseInt(e.target.value))}
              min="1"
              placeholder="Min"
            />
            <Input
              type="number"
              value={customRanges.subtraction.max}
              onChange={(e) => onRangeChange('subtraction', 'max', parseInt(e.target.value))}
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
            onChange={(e) => onRangeChange('multiplication', 'max', parseInt(e.target.value))}
            min="1"
            className="mt-1"
          />
        </div>

        <div>
          <Label className="text-sm text-muted-foreground">Division (max)</Label>
          <Input
            type="number"
            value={customRanges.division.max}
            onChange={(e) => onRangeChange('division', 'max', parseInt(e.target.value))}
            min="1"
            className="mt-1"
          />
        </div>
      </div>
    </div>
  );
};

export default CustomRangesForm;