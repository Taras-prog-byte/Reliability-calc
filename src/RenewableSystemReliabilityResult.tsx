import { Grid, Typography } from "@mui/material";
import rungeKutta from "runge-kutta";

const INITIAL_PROBABILITIES = [1, ...new Array(95).fill(0)];
const FAILURE_STATES = [
  5, 7, 9, 11, 12, 14, 15, 16, 17, 18, 19, 20, 21, 21, 23, 24, 29, 31, 33, 35,
  36, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 53, 55, 57, 59, 60, 62, 63, 64,
  65, 66, 67, 68, 69, 70, 71, 77, 81, 83, 84, 86, 87, 88, 89, 90, 91, 92, 93,
  94, 95,
];
const PERMANENT_FAILURE_STATES = [79];

export interface RenewableSystemReliabilityCalculatorProps {
  lambdas: number[];
  renewalIntensities: number[];
  moment: number;
}
export function RenewableSystemReliabilityCalculator({
  lambdas: l,
  renewalIntensities: m,
  moment,
}: RenewableSystemReliabilityCalculatorProps) {
  const equations = (t: number, P: number[]) => [
    /* 0 */ 0 +
      m[1] * P[2] +
      m[3] * P[4] +
      m[4] * P[5] -
      (l[0] + l[1] + l[2] + l[3] + l[4]) * P[0],
    /* 1 */ 0 +
      l[0] * P[0] +
      m[1] * P[6] +
      m[3] * P[8] +
      m[4] * P[9] -
      (l[1] + l[2] + l[3] + l[4] + m[0]) * P[1],
    /* 2 */ 0 +
      l[1] * P[0] +
      m[3] * P[11] +
      m[4] * P[12] -
      (l[0] + l[2] + l[3] + l[4] + m[1]) * P[2],
    /* 3 */ 0 +
      l[2] * P[0] +
      m[1] * P[10] +
      m[3] * P[13] +
      m[4] * P[14] -
      (l[0] + l[1] + l[3] + l[4] + m[2]) * P[3],
    /* 4 */ 0 +
      l[3] * P[0] +
      m[1] * P[11] +
      m[4] * P[15] -
      (l[0] + l[1] + l[2] + l[4] + m[3]) * P[4],
    /* 5 */ 0 + l[4] * P[0] + m[1] * P[12] + m[3] * P[15] - m[4] * P[5],
    /* 6 */ 0 +
      l[1] * P[1] +
      l[0] * P[2] +
      m[3] * P[17] +
      m[4] * P[18] -
      (l[2] + l[3] + l[4] + m[1] + m[0]) * P[6],
    /* 7 */ 0 +
      l[2] * P[1] +
      l[0] * P[3] +
      m[1] * P[16] +
      m[3] * P[19] -
      (m[0] + m[2]) * P[7],
    /* 8 */ 0 +
      l[3] * P[1] +
      l[0] * P[4] +
      m[1] * P[17] +
      m[4] * P[20] -
      (l[1] + l[2] + l[4] + m[3] + m[0]) * P[8],
    /* 9 */ 0 +
      l[4] * P[1] +
      m[1] * P[18] +
      m[3] * P[20] -
      (m[4] + m[0]) * P[9],
    /* 10 */ 0 +
      l[2] * P[2] +
      l[1] * P[3] +
      m[3] * P[21] +
      m[4] * P[22] -
      (l[0] + l[3] + l[4] + m[1] + m[2]) * P[10],
    /* 11 */ 0 + l[3] * P[2] + l[1] * P[4] - (m[1] + m[3]) * P[11],
    /* 12 */ 0 + l[4] * P[2] - (m[1] + m[4]) * P[12],
    /* 13 */ 0 +
      l[3] * P[3] +
      l[2] * P[4] +
      m[1] * P[21] +
      m[4] * P[23] -
      (l[0] + l[1] + l[4] + m[3] + m[2]) * P[13],
    /* 14 */ 0 +
      l[4] * P[3] +
      m[1] * P[22] +
      m[3] * P[23] -
      (m[4] + m[2]) * P[14],
    /* 15 */ l[4] * P[4] - (m[3] + m[4]) * P[15],
    /* 16 */ l[2] * P[6] + l[0] * P[10] - (m[1] + m[0] + m[2]) * P[16],
    /* 17 */ l[3] * P[6] + l[1] * P[8] - (m[1] + m[3] + m[0]) * P[17],
    /* 18 */ l[4] * P[6] - (m[1] + m[4] + m[0]) * P[18],
    /* 19 */ l[2] * P[8] + l[0] * P[13] - (m[3] + m[0] + m[2]) * P[19],
    /* 20 */ l[4] * P[8] - (m[3] + m[4] + m[0]) * P[20],
    /* 21 */ l[3] * P[10] + l[1] * P[13] - (m[1] + m[3] + m[2]) * P[21],
    /* 22 */ l[4] * P[10] - (m[1] + m[4] + m[2]) * P[22],
    /* 23 */ l[4] * P[13] - (m[3] + m[4] + m[2]) * P[23],
    /* 24 */ 0 +
      m[1] * P[26] +
      m[3] * P[28] +
      m[4] * P[29] +
      m[0] * P[1] -
      (l[0] + l[1] + l[2] + l[3] + l[4]) * P[24],
    /* 25 */ 0 +
      l[0] * P[24] +
      m[1] * P[30] +
      m[3] * P[32] +
      m[4] * P[33] -
      (l[1] + l[2] + l[3] + l[4]) * P[25],
    /* 26 */ 0 +
      l[1] * P[24] +
      m[3] * P[35] +
      m[4] * P[36] +
      m[0] * P[6] -
      (l[0] + l[2] + l[3] + l[4] + m[1]) * P[26],
    /* 27 */ 0 +
      l[2] * P[24] +
      m[1] * P[34] +
      m[3] * P[37] +
      m[4] * P[38] +
      m[0] * P[7] -
      (l[0] + l[1] + l[3] + l[4] + m[2]) * P[27],
    /* 28 */ 0 +
      l[3] * P[24] +
      m[1] * P[35] +
      m[4] * P[39] +
      m[0] * P[8] -
      (l[0] + l[1] + l[2] + l[4] + m[3]) * P[28],
    /* 29 */ 0 +
      l[4] * P[24] +
      m[1] * P[36] +
      m[3] * P[39] +
      m[0] * P[9] -
      m[4] * P[29],
    /* 30 */ 0 +
      l[1] * P[25] +
      l[0] * P[26] +
      m[3] * P[41] +
      m[4] * P[42] -
      (l[2] + l[3] + l[4] + m[1]) * P[30],
    /* 31 */ 0 +
      l[2] * P[25] +
      l[0] * P[27] +
      m[1] * P[40] +
      m[3] * P[43] -
      m[2] * P[31],
    /* 32 */ 0 +
      l[3] * P[25] +
      l[0] * P[28] +
      m[1] * P[41] +
      m[4] * P[44] -
      (l[1] + l[2] + l[4] + m[3]) * P[32],
    /* 33 */ 0 + l[4] * P[25] + m[1] * P[42] + m[3] * P[44] - m[4] * P[33],
    /* 34 */ 0 +
      l[2] * P[26] +
      l[1] * P[27] +
      m[3] * P[45] +
      m[4] * P[46] +
      m[0] * P[16] -
      (l[0] + l[3] + l[4] + m[1] + m[2]) * P[34],
    /* 35 */ 0 +
      l[3] * P[26] +
      l[1] * P[28] +
      m[0] * P[17] -
      (m[1] + m[3]) * P[35],
    /* 36 */ 0 + l[4] * P[26] + m[0] * P[18] - (m[1] + m[4]) * P[36],
    /* 37 */ 0 +
      l[3] * P[27] +
      l[2] * P[28] +
      m[1] * P[45] +
      m[4] * P[47] +
      m[0] * P[19] -
      (l[0] + l[1] + l[4] + m[3] + m[2]) * P[37],
    /* 38 */ 0 +
      l[4] * P[27] +
      m[1] * P[46] +
      m[3] * P[47] -
      (m[4] + m[2]) * P[38],
    /* 39 */ l[4] * P[28] + m[0] * P[20] - (m[3] + m[4]) * P[39],
    /* 40 */ l[2] * P[30] + l[0] * P[34] - (m[1] + m[2]) * P[40],
    /* 41 */ l[3] * P[30] + l[1] * P[32] - (m[1] + m[3]) * P[41],
    /* 42 */ l[4] * P[30] - (m[1] + m[4]) * P[42],
    /* 43 */ l[2] * P[32] + l[0] * P[37] - (m[3] + m[2]) * P[43],
    /* 44 */ l[4] * P[32] - (m[3] + m[4]) * P[44],
    /* 45 */ l[3] * P[34] + l[1] * P[37] - (m[1] + m[3] + m[2]) * P[45],
    /* 46 */ l[4] * P[34] - (m[1] + m[4] + m[2]) * P[46],
    /* 47 */ l[4] * P[37] - (m[3] + m[4] + m[2]) * P[47],
    /* 48 */ 0 +
      m[1] * P[50] +
      m[3] * P[52] +
      m[4] * P[53] +
      m[2] * P[3] -
      (l[0] + l[1] + l[2] + l[3] + l[4]) * P[48],
    /* 49 */ 0 +
      l[0] * P[48] +
      m[1] * P[54] +
      m[3] * P[56] +
      m[4] * P[57] +
      m[2] * P[7] -
      (l[1] + l[2] + l[3] + l[4] + m[0]) * P[49],
    /* 50 */ 0 +
      l[1] * P[48] +
      m[3] * P[59] +
      m[4] * P[60] +
      m[2] * P[10] -
      (l[0] + l[2] + l[3] + l[4] + m[1]) * P[50],
    /* 51 */ 0 +
      l[2] * P[48] +
      m[1] * P[58] +
      m[3] * P[61] +
      m[4] * P[62] -
      (l[0] + l[1] + l[3] + l[4]) * P[51],
    /* 52 */ 0 +
      l[3] * P[48] +
      m[1] * P[59] +
      m[4] * P[63] +
      m[2] * P[13] -
      (l[0] + l[1] + l[2] + l[4] + m[3]) * P[52],
    /* 53 */ 0 +
      l[4] * P[48] +
      m[1] * P[60] +
      m[3] * P[63] +
      m[2] * P[14] -
      m[4] * P[53],
    /* 54 */ 0 +
      l[1] * P[49] +
      l[0] * P[50] +
      m[3] * P[65] +
      m[4] * P[66] +
      m[2] * P[16] -
      (l[2] + l[3] + l[4] + m[1] + m[0]) * P[54],
    /* 55 */ 0 +
      l[2] * P[49] +
      l[0] * P[51] +
      m[1] * P[64] +
      m[3] * P[67] -
      m[0] * P[55],
    /* 56 */ 0 +
      l[3] * P[49] +
      l[0] * P[52] +
      m[1] * P[65] +
      m[4] * P[68] +
      m[2] * P[19] -
      (l[1] + l[2] + l[4] + m[3] + m[0]) * P[56],
    /* 57 */ 0 +
      l[4] * P[49] +
      m[1] * P[66] +
      m[3] * P[68] -
      (m[4] + m[0]) * P[57],
    /* 58 */ 0 +
      l[2] * P[50] +
      l[1] * P[51] +
      m[3] * P[69] +
      m[4] * P[70] -
      (l[0] + l[3] + l[4] + m[1]) * P[58],
    /* 59 */ 0 +
      l[3] * P[50] +
      l[1] * P[52] +
      m[2] * P[21] -
      (m[1] + m[3]) * P[59],
    /* 60 */ 0 + l[4] * P[50] + m[2] * P[22] - (m[1] + m[4]) * P[60],
    /* 61 */ 0 +
      l[3] * P[51] +
      l[2] * P[52] +
      m[1] * P[69] +
      m[4] * P[71] -
      (l[0] + l[1] + l[4] + m[3]) * P[61],
    /* 62 */ 0 + l[4] * P[51] + m[1] * P[70] + m[3] * P[71] - m[4] * P[62],
    /* 63 */ l[4] * P[52] + m[2] * P[23] - (m[3] + m[4]) * P[63],
    /* 64 */ l[2] * P[54] + l[0] * P[58] - (m[1] + m[0]) * P[64],
    /* 65 */ l[3] * P[54] + l[1] * P[56] - (m[1] + m[3] + m[0]) * P[65],
    /* 66 */ l[4] * P[54] - (m[1] + m[4] + m[0]) * P[66],
    /* 67 */ l[2] * P[56] + l[0] * P[61] - (m[3] + m[0]) * P[67],
    /* 68 */ l[4] * P[56] - (m[3] + m[4] + m[0]) * P[68],
    /* 69 */ l[3] * P[58] + l[1] * P[61] - (m[1] + m[3]) * P[69],
    /* 70 */ l[4] * P[58] - (m[1] + m[4]) * P[70],
    /* 71 */ l[4] * P[61] - (m[3] + m[4]) * P[71],
    /* 72 */ 0 +
      m[1] * P[74] +
      m[3] * P[76] +
      m[4] * P[77] +
      m[2] * P[27] +
      m[0] * P[49] -
      (l[0] + l[1] + l[2] + l[3] + l[4]) * P[72],
    /* 73 */ 0 +
      l[0] * P[72] +
      m[1] * P[78] +
      m[3] * P[80] +
      m[4] * P[81] +
      m[2] * P[31] -
      (l[1] + l[2] + l[3] + l[4]) * P[73],
    /* 74 */ 0 +
      l[1] * P[72] +
      m[3] * P[83] +
      m[4] * P[84] +
      m[2] * P[34] +
      m[0] * P[54] -
      (l[0] + l[2] + l[3] + l[4] + m[1]) * P[74],
    /* 75 */ 0 +
      l[2] * P[72] +
      m[1] * P[82] +
      m[3] * P[85] +
      m[4] * P[86] +
      m[0] * P[55] -
      (l[0] + l[1] + l[3] + l[4]) * P[75],
    /* 76 */ 0 +
      l[3] * P[72] +
      m[1] * P[83] +
      m[4] * P[87] +
      m[2] * P[37] +
      m[0] * P[56] -
      (l[0] + l[1] + l[2] + l[4] + m[3]) * P[76],
    /* 77 */ 0 +
      l[4] * P[72] +
      m[1] * P[84] +
      m[3] * P[87] +
      m[2] * P[38] +
      m[0] * P[57] -
      m[4] * P[77],
    /* 78 */ 0 +
      l[1] * P[73] +
      l[0] * P[74] +
      m[3] * P[89] +
      m[4] * P[90] +
      m[2] * P[40] -
      (l[2] + l[3] + l[4] + m[1]) * P[78],
    /* 79 */ 0 + l[2] * P[73] + l[0] * P[75] + m[1] * P[88] + m[3] * P[91],
    /* 80 */ 0 +
      l[3] * P[73] +
      l[0] * P[76] +
      m[1] * P[89] +
      m[4] * P[92] +
      m[2] * P[43] -
      (l[1] + l[2] + l[4] + m[3]) * P[80],
    /* 81 */ 0 + l[4] * P[73] + m[1] * P[90] + m[3] * P[92] - m[4] * P[81],
    /* 82 */ 0 +
      l[2] * P[74] +
      l[1] * P[75] +
      m[3] * P[93] +
      m[4] * P[94] +
      m[0] * P[64] -
      (l[0] + l[3] + l[4] + m[1]) * P[82],
    /* 83 */ 0 +
      l[3] * P[74] +
      l[1] * P[76] +
      m[2] * P[45] +
      m[0] * P[65] -
      (m[1] + m[3]) * P[83],
    /* 84 */ 0 +
      l[4] * P[74] +
      m[2] * P[46] +
      m[0] * P[66] -
      (m[1] + m[4]) * P[84],
    /* 85 */ 0 +
      l[3] * P[75] +
      l[2] * P[76] +
      m[1] * P[93] +
      m[4] * P[95] +
      m[0] * P[67] -
      (l[0] + l[1] + l[4] + m[3]) * P[85],
    /* 86 */ 0 + l[4] * P[75] + m[1] * P[94] + m[3] * P[95] - m[4] * P[86],
    /* 87 */ l[4] * P[76] + m[2] * P[47] + m[0] * P[68] - (m[3] + m[4]) * P[87],
    /* 88 */ l[2] * P[78] + l[0] * P[82] - m[1] * P[88],
    /* 89 */ l[3] * P[78] + l[1] * P[80] - (m[1] + m[3]) * P[89],
    /* 90 */ l[4] * P[78] - (m[1] + m[4]) * P[90],
    /* 91 */ l[2] * P[80] + l[0] * P[85] - m[3] * P[91],
    /* 92 */ l[4] * P[80] - (m[3] + m[4]) * P[92],
    /* 93 */ l[3] * P[82] + l[1] * P[85] - (m[1] + m[3]) * P[93],
    /* 94 */ l[4] * P[82] - (m[1] + m[4]) * P[94],
    /* 95 */ l[4] * P[85] - (m[3] + m[4]) * P[95],
  ];

  const probabilitiesByMoment = rungeKutta(
    equations,
    INITIAL_PROBABILITIES,
    [0, moment || 1],
    1
  ) as number[][];
  const probabilities = probabilitiesByMoment[moment];

  const totalProbability = probabilities.reduce((sum, p) => sum + p, 0);

  const temporaryFailureProbability = probabilities
    .filter((p, i) => FAILURE_STATES.includes(i))
    .reduce((sum, p) => sum + p, 0);
  const permanentFailureProbability = probabilities
    .filter((p, i) => PERMANENT_FAILURE_STATES.includes(i))
    .reduce((sum, p) => sum + p, 0);
  const serviceabilityProbability =
    totalProbability -
    temporaryFailureProbability -
    permanentFailureProbability;

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Typography variant="h6">Reliabilities</Typography>
        {probabilities.map((p, i) => (
          <Typography variant="body1" key={i}>{`P[${i}] = ${p}`}</Typography>
        ))}
      </Grid>
      <Grid item xs={6}>
        <Typography variant="h6">Temporary failure probability</Typography>
        <Typography variant="body1">{temporaryFailureProbability}</Typography>
        <Typography variant="h6">Permanent failure probability</Typography>
        <Typography variant="body1">{permanentFailureProbability}</Typography>
        <Typography variant="h6">Serviceability probability</Typography>
        <Typography variant="body1">{serviceabilityProbability}</Typography>
        <Typography variant="h6">Total probability</Typography>
        <Typography variant="body1">{totalProbability}</Typography>
      </Grid>
    </Grid>
  );
}
