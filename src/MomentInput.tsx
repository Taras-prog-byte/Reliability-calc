import { TextField } from "@mui/material";

export interface MomentInputProps {
  moment: number;
  onMomentChange: (moment: number) => void;
}

export function MomentInput({ moment, onMomentChange }: MomentInputProps) {
  const onChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const numberValue = Number(event.target.value);
    const normalizedValue = numberValue >= 0 ? numberValue : 0;
    onMomentChange(normalizedValue);
  };

  return (
    <TextField
      label="Time moment"
      type="number"
      value={moment}
      onChange={onChange}
    />
  );
}
