import { Grid, Stepper, Typography, Step, StepLabel, Paper, StepContent } from "@mui/material";
import { useEffect } from "react";
import useStyle from "./TrackerStyles";


const steps = [
    {
      label: 'رساله ترحيب',
      description: `س`,
    },
    {
      label: 'Create an ad group',
      description:
        'An ad group contains one or more ads which target a shared set of keywords.',
    },
    {
      label: 'Create an ad',
      description: `ي.`,
    },
    {
        label: 'Create an ad',
        description: `ي.`,
      },{
        label: 'Create an ad',
        description: `ي.`,
      },{
        label: 'Create an ad',
        description: `ي.`,
      },{
        label: 'Create an ad',
        description: `ي.`,
      },{
        label: 'Create an ad',
        description: `ي.`,
      },{
        label: 'Create an ad',
        description: `ي.`,
      },{
        label: 'Create an ad',
        description: `ي.`,
      },{
        label: 'Create an ad',
        description: `ي.`,
      },{
        label: 'Create an ad',
        description: `ي.`,
      },
  ];

export const Tracker = ({activeStep}) => {
  const classes = useStyle();

  useEffect(() => {
    const element = document.getElementById(activeStep);
    element.scrollIntoView({ behavior: 'smooth' });
  }, [activeStep])
  

    return(<Grid container className={classes.TrackerContainer} >
        
        <Grid item>
                <Stepper activeStep={activeStep} orientation="vertical">
                {steps.map((step, index) => (
                <Step key={step.label} id={index}>
                    <StepLabel
                    optional={
                        index === 2 ? (
                        <Typography variant="caption">Last step</Typography>
                        ) : null
                    }
                    >
                    {step.label}
                    </StepLabel>
                    <StepContent>
                    <Typography>{step.description}</Typography>
                    </StepContent>
                </Step>
                ))}
            </Stepper>
            {activeStep === steps.length && (
                <Paper square elevation={0} sx={{ p: 3 }}>
                <Typography>All steps completed - you&apos;re finished</Typography>
                </Paper>
            )}
        </Grid>
    </Grid>);

}

export default Tracker;