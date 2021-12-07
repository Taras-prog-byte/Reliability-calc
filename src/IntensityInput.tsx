import React from "react";
import { Grid, TextField } from "@mui/material";

export interface IntensityInputProps {
  intensity: number[];
  onIntensityChange: (intensity: number[]) => void;
}

export function IntensityInput({
  intensity,
  onIntensityChange,
}: IntensityInputProps) {
  const getChangeHandler =
    (index: number) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const numberValue = Number(event.target.value);
      const normalizedValue = numberValue >= 0 ? numberValue : 0;

      return onIntensityChange([
        ...intensity.slice(0, index),
        normalizedValue,
        ...intensity.slice(index + 1),
      ]);
    };

  const renderIntensity = (index: number) => (
    <TextField
      label={`Intensity ${index}`}
      type="number"
      value={intensity[index]}
      onChange={getChangeHandler(index)}
    />
  );

  return (
    <>
      <Grid container spacing={2}>
        {[...new Array(3).keys()].map((i) => (
          <Grid item key={i}>
            {renderIntensity(i)}
          </Grid>
        ))}
      </Grid>
    </>
  );
}
