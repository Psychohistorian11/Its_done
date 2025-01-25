import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface PriorityProps {
  priority: string;
  setPriority: (value: string) => void;
}

export function RadioGroupDemo({ priority, setPriority }: PriorityProps) {
  const handleChange = (newValue: string) => {
    setPriority(newValue);
  };

  return (
    <div className="border border-primary p-4 rounded-sm">
      <RadioGroup
        defaultValue="comfortable"
        className="flex text-white justify-between"
        onValueChange={handleChange}
        value={priority}
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="low" id="r1" />
          <Label htmlFor="r1">Low</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="medium" id="r2" />
          <Label htmlFor="r2">Medium</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="high" id="r3" />
          <Label htmlFor="r3">High</Label>
        </div>
      </RadioGroup>
    </div>
  );
}
