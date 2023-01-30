import {
  Grid,
  Stepper,
  Typography,
  Step,
  StepLabel,
  Paper,
  StepContent,
} from "@mui/material";
import { useEffect } from "react";
import theme from "../../../Utilities/Theme";
import { explainSteps } from "../../../Utilities/utilitesFunction";
import useStyle from "./TrackerStyles";



export const Tracker = ({ activeStep }) => {
  const classes = useStyle();

  

  var steps = [];

  for(let i=0 ; i < 14;i++){
    steps.push({
      label:explainSteps(i)[0],
      description:explainSteps(i)[1],
    })
  }


  useEffect(() => {
  
    if(activeStep > 5){
      // const element = document.getElementById(activeStep-2);
      // element.scrollIntoView({ behavior: "smooth" });
    }

  }, [activeStep]);

  return (
    <Grid
      container
      item
      xs={12}
      textAlign="center"
      justifyContent="center"
      className={classes.TrackerContainer}
    >
      <Grid item>
        <Stepper sx={{ borderColor:"red" }} activeStep={activeStep} orientation="vertical">
          {steps.map((step, index) => (
            <Step  key={step.label} id={index}>
              <StepLabel
                optional={
                  index === 13 ? (
                    <Typography variant="caption">الخطوة الاخيرة</Typography>
                  ) : null
                }
              >
                <Typography>{step.label}</Typography>
              </StepLabel>
              <StepContent>
                <Typography sx={{color:theme.palette.primary.main}}>{step.description}</Typography>
              </StepContent>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length-1 && (
          <Paper square elevation={0} sx={{ p: 3 }}>
            <Typography>لقد قمت باتمام كل خطوات الاستطلاع بنجاح</Typography>
          </Paper>
        )}
      </Grid>
    </Grid>
  );
};

export default Tracker;
