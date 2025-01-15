import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { CustomRanges } from "@/types/mathGame";

interface CustomRangesFormProps {
  customRanges: CustomRanges;
  onRangeChange: (operation: keyof CustomRanges, field: 'max' | 'min' | 'enabled', value: number | boolean) => void;
}

const CustomRangesForm = ({ customRanges, onRangeChange }: CustomRangesFormProps) => {
  return (
    <div className="space-y-4 p-4 border rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-sm text-muted-foreground">Addition</Label>
            <Switch
              checked={customRanges.addition.enabled}
              onCheckedChange={(checked) => {
                onRangeChange('addition', 'enabled', checked);
              }}
            />
          </div>
          {customRanges.addition.enabled && (
            <Input
              type="number"
              value={customRanges.addition.max}
              onChange={(e) => onRangeChange('addition', 'max', parseInt(e.target.value))}
              min="1"
              className="mt-1"
              placeholder="Max value"
            />
          )}
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-sm text-muted-foreground">Subtraction</Label>
            <Switch
              checked={customRanges.subtraction.enabled}
              onCheckedChange={(checked) => {
                onRangeChange('subtraction', 'enabled', checked);
              }}
            />
          </div>
          {customRanges.subtraction.enabled && (
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
          )}
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-sm text-muted-foreground">Multiplication</Label>
            <Switch
              checked={customRanges.multiplication.enabled}
              onCheckedChange={(checked) => {
                onRangeChange('multiplication', 'enabled', checked);
              }}
            />
          </div>
          {customRanges.multiplication.enabled && (
            <Input
              type="number"
              value={customRanges.multiplication.max}
              onChange={(e) => onRangeChange('multiplication', 'max', parseInt(e.target.value))}
              min="1"
              className="mt-1"
              placeholder="Max value"
            />
          )}
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-sm text-muted-foreground">Division</Label>
            <Switch
              checked={customRanges.division.enabled}
              onCheckedChange={(checked) => {
                onRangeChange('division', 'enabled', checked);
              }}
            />
          </div>
          {customRanges.division.enabled && (
            <Input
              type="number"
              value={customRanges.division.max}
              onChange={(e) => onRangeChange('division', 'max', parseInt(e.target.value))}
              min="1"
              className="mt-1"
              placeholder="Max value"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomRangesForm;