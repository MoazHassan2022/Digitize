import { Grid, Paper } from "@mui/material";
import theme from "../../Utilities/Theme";
import useStyle from "./FormContainerStyles";
import { Stack } from "@mui/system";

export const FormContainer = ({ Title, children }) => {
  const classes = useStyle();

  return (
    <Grid
      container
      direction='row'
      justifyContent='center'
      alignItems='flex-start'
      className={classes.SignPage}
    >
      <Grid
        container
        item
        component={Paper}
        elevation={0}
        sx={{ borderRadius: "2rem", bgcolor: "transparent", margin: ".5rem" }}
        xs={12}
        md={8}
        direction='row'
        justifyContent='space-around'
        className={classes.FormContainer}
      >
        <Grid
          container
          direction='row'
          alignItems='flex-start'
          item
          xs={12}
          sm={8}
          textAlign='center'
          className={classes.StepsContainer}
        >
          <Grid xs={12} textAlign='center' justifyContent='stretch'>
            <Stack
              component={Paper}
              sx={{
                padding: 2,
                height: "100%",
                bgcolor: theme.palette.primary.main,
                fontSize: "1rem",
                fontWeight: 900,
                borderRadius: "0",
                borderTopLeftRadius: "1rem",
                borderTopRightRadius: "1rem",
              }}
              direction='row'
              justifyContent='center'
              alignItems='center'
            >
              {Title}
            </Stack>
          </Grid>

          <Grid
            container
            xs={12}
            alignItems='center'
            justifyContent='center'
            className={classes.ChildContainer}
          >
            {children}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default FormContainer;
