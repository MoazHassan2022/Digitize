import { Alert, Avatar, Button,  Grid,  Paper, Snackbar, TextField, Typography } from "@mui/material";
import { useState } from "react";
import {HiLogin } from "react-icons/hi";
import useStyle from "./ChangePasswordStyles";

export const ChangePassword = () => {
  const classes = useStyle();

  const [OldPassword , setOldPassword] = useState("");
  const [NewPassWord , setNewPassWord] = useState("");
  const [ConfirmNewPassword, setConfirmNewPassword] = useState("");
  const [snakeData, setSnakeData] = useState([false,"",""]);


  const HandleSubmit = (e) =>{
    e.preventDefault();
    setTimeout(history("/Setting") , 5000);
  }

return (
  <Grid 
  container 
  alignItems="center"
  justifyContent="center"
  className={classes.SignPage}
  > 
    <Grid item container xs={12} md={6} direction="column"  alignItems="center">
      <form className={classes.Form} onSubmit={HandleSubmit}>
        <Grid item container xs={12} md={12} component={Paper} direction="row" spacing={4} className={classes.SignCard} alignItems="center">
          <Grid item className={classes.Logo} xs={12} >
                <Avatar variant="rounded" sx={{ width: "auto", height: "auto", transform:"scale(.4)" }} src="/Assets/Digitize.png" alt="CO" />
          </Grid>

          <Grid item xs={12} textAlign="center">
            <Typography
                variant="h2"
                color="primary"
              >
                Change your password
            </Typography>
          </Grid>

          <Grid item xs={12} align="center">
            <TextField
            label="old password"
            type="password"
            required
            autoFocus
            value={OldPassword}
            onChange={(e) => {setOldPassword(e.target.value)}}
            className={classes.textField}
            />
          </Grid>

          <Grid item xs={12} align="center">
            <TextField
            label="new password"
            type="text"
            required
            autoFocus
            value={NewPassWord}
            onChange={(e) => {setNewPassWord(e.target.value)}}
            className={classes.textField}
            />
          </Grid>

          <Grid item xs={12} align="center">
            <TextField
            label="confirm new password"
            type="Password"
            required
            autoFocus
            value={ConfirmNewPassword}
            onChange={(e) => {setConfirmNewPassword(e.target.value)}}
            className={classes.textField}
            />
          </Grid>

          <Grid item xs={12} align="center">
            <Button type="submit" variant="contained" endIcon={<HiLogin /> } >Change Password</Button>
          </Grid>
        </Grid>
      </form>
    </Grid>
    <Snackbar sx={{ width:400, }} open={snakeData[0]} autoHideDuration={3000} onClose={() => setSnakeData([false , "" , ""]) }>
            <Alert onClose={() => setSnakeData([false , "" , ""])} severity={snakeData[2] === "success" ? "success" : (snakeData[2] === "error" ?"error" :"info")} >
                {snakeData[1]}
            </Alert >
    </Snackbar>
  </Grid>
);


}

export default ChangePassword;