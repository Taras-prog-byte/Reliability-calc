import { Grid, Typography } from "@mui/material";
import rungeKutta from "runge-kutta";

const INITIAL_PROBABILITIES = [1, ...new Array(6).fill(0)];
const FAILURE_STATES = [
  4, 5, 6, 7
];

export interface ReliabilityResultProps {
  lambdas: number[];
  moment: number;
}

export function ReliabilityResult({
  lambdas: l,
  moment,
}: ReliabilityResultProps) {
  const equations = (t: number, P: number[]) => [
    /* 1 */ -(l[0] + l[1] + l[2]) * P[0],
    /* 2 */ l[0] * P[0] - (l[1] + l[2]) * P[1],
    /* 3 */ l[1] * P[0] - (l[0] + l[2]) * P[2],
    /* 4 */ l[2] * P[0],
    /* 5 */ l[2] * P[1],
    /* 6 */ l[1] * P[1]+l[0]*P[2],
    /* 7 */ l[2] * P[2]
  ];

  const probabilitiesByMoment = rungeKutta(
    equations,
    INITIAL_PROBABILITIES,
    [0, moment || 1],
    1
  ) as number[][];
  const probabilities = probabilitiesByMoment[moment];

  const totalProbability = probabilities.reduce((sum, p) => sum + p, 0);

  const failureProbability = probabilities
    .filter((p, i) => FAILURE_STATES.includes(i))
    .reduce((sum, p) => sum + p, 0);
  const serviceabilityProbability = totalProbability - failureProbability;

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Typography variant="h6">Reliabilities</Typography>
        {probabilities.map((p, i) => (
          <Typography variant="body1" key={i}>{`P[${i}] = ${p}`}</Typography>
        ))}
      </Grid>
      <Grid item xs={6}>
        <Typography variant="h6">Failure probability</Typography>
        <Typography variant="body1">{failureProbability}</Typography>
        <Typography variant="h6">Serviceability probability</Typography>
        <Typography variant="body1">{serviceabilityProbability}</Typography>
        <Typography variant="h6">Total probability</Typography>
        <Typography variant="body1">{totalProbability}</Typography>
      </Grid>
    </Grid>
  );
}
