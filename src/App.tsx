import React from "react";
import { Container, Grid, Switch, Typography } from "@mui/material";
import { IntensityInput } from "./IntensityInput";
import { ReliabilityResult } from "./ReliabilityResult";
import { MomentInput } from "./MomentInput";
import { RenewableSystemReliabilityCalculator } from "./RenewableSystemReliabilityResult";

function App() {
  const [renewable, setRenewable] = React.useState(true);
  const [failureIntensity, setFailureIntensity] = React.useState<number[]>([
    0.0005, 0.0004, 0.0003, 0.00025, 0.0005,
  ]);
  const [renewalIntensity, setRenewalIntensity] = React.useState<number[]>([
    0.05, 0.05, 0.05, 0.05, 0.05,
  ]);
  const [moment, setMoment] = React.useState<number>(1);

  return (
    <Container>
      <Grid container spacing={2} mt={1}>
        <Grid item xs={12}>
          {/*<Typography variant="h6">Renewals</Typography>*/}

          {/*<Switch*/}
          {/*  defaultChecked*/}
          {/*  value={renewable}*/}
          {/*  onChange={(event) => {*/}
          {/*    console.log(event.target.checked);*/}
          {/*    return setRenewable(event.target.checked);*/}
          {/*  }}*/}
          {/*/>*/}
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" mb={2}>
            Failure intensity
          </Typography>
          <IntensityInput
            intensity={failureIntensity}
            onIntensityChange={setFailureIntensity}
          />
        </Grid>
        {renewable && (
          <Grid item xs={12}>
            <Typography variant="h6" mb={2}>
              Renewal intensity
            </Typography>
            <IntensityInput
              intensity={renewalIntensity}
              onIntensityChange={setRenewalIntensity}
            />
          </Grid>
        )}
        <Grid item xs={12}>
          <MomentInput moment={moment} onMomentChange={setMoment} />
        </Grid>
        <Grid item xs={12}>
          {renewable ? (
            <RenewableSystemReliabilityCalculator
              lambdas={failureIntensity}
              renewalIntensities={renewalIntensity}
              moment={moment}
            />
          ) : (
            <ReliabilityResult lambdas={failureIntensity} moment={moment} />
          )}
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
