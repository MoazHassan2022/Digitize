import { Grid, Paper, Typography } from "@mui/material"
import theme from "../../Utilities/Theme";
import useStyle from "./FormContainerStyles";


export const FormContainer = ({Title ,children }) =>{
    const classes = useStyle();

    return(
        <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="flex-start"
        className={classes.SignPage}
      >
            <Grid
            container
            item
            component={Paper}
            elevation={0}
            sx={{ borderRadius: "2rem", bgcolor: "transparent" ,margin:".5rem"}}
            xs={12}
            md={8}
            direction="row"
            justifyContent="space-around"
            className={classes.FormContainer}
        >
                <Grid
                  container
                  direction="row"
                  alignItems="flex-start"
                item
                xs={12}
                sm={8}
                textAlign="center"
                className={classes.StepsContainer}
                >

                    <Grid
                        item
                        xs={12}
                        component={Paper}
                        sx={{
                        height:"3rem",
                        bgcolor: theme.palette.primary.main,
                        fontSize: "1rem",
                        fontWeight: 900,
                        borderRadius: "0",
                        borderTopLeftRadius: "1rem",
                        borderTopRightRadius: "1rem",
                        }}
                        textAlign="center"
                    >
                        {Title}
                    </Grid>

                    <Grid item container alignItems="center" justifyContent="center" >
                        {children}
                    </Grid>



                </Grid>
            </Grid>
        </Grid>


    );
}


export default FormContainer;