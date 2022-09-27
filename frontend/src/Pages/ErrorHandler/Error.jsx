import { Avatar,  Grid,  Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useStyle from "./ErrorStyles";

export const ErrorH = () => {
  const classes = useStyle();
  const history = useNavigate();
  setTimeout(()=>{history("/")}, 5000)

return (
  <Grid 
  container 
  alignItems="center"
  justifyContent="center"
  className={classes.SignPage}
  > 
    <Grid item container xs={12} md={6} direction="column"  alignItems="center">
      <form className={classes.Form} >
        <Grid item container xs={12} md={12} component={Paper} direction="row" spacing={4} className={classes.SignCard} alignItems="center">
          <Grid item className={classes.Logo} xs={12} >
                <Avatar variant="rounded" sx={{ width: "auto", height: "auto", transform:"scale(.4)" }} src="/public/Assets/Digitize.png" alt="CO" />
          </Grid>

          <Grid item xs={12} textAlign="center">
            <Typography
                variant="h1"
                color="primary"
              >
                عذرا لقد حصل خطا في الموقع قم باعاده تحميل الصفحه
            </Typography>
          </Grid>

        </Grid>
      </form>
    </Grid>
  </Grid>
);


}

export default ErrorH;