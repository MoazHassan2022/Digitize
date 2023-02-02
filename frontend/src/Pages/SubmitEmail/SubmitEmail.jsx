import { Alert, Avatar, Button,  Grid,  Paper, Snackbar, TextField, Typography } from "@mui/material";
import { useState } from "react";
import {BiReset } from "react-icons/bi";
import useStyle from "./SubmitEmailStyles";
import axios from "axios";
import { LogoPath, baseapi, mediaApi } from "../../Utilities/utilitesFunction";

export const SubmitEmail = () => {
  const classes = useStyle();
  const [Email , setEmail] = useState("");
  const [snakeData, setSnakeData] = useState([false,"",""]);
  
  const HandleSubmit = async (e) =>{
    e.preventDefault();
    let user = {
        "email" : Email,
    };
    await axios.post(baseapi + "/users/forgotPassword", user)
    .then(res => { 

        setSnakeData([true, " تم ارسال رسالة الي الايميل تتضمن رابط انقر علية لتعيد كلمة السر افحص الايميل الخاص بك . اذا لم تصلك رسالة في خلال دقيقة اعد الضغط مرة اخري" , "info"]);
    } )
    .catch((err) =>{
        setSnakeData([true, err.response.data.message , "error"])
      });
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
                <Avatar variant="rounded" sx={{ width: "auto", height: "auto", transform:"scale(.4)" }} src={mediaApi + LogoPath} alt="CO" />
          </Grid>

          <Grid item xs={12} textAlign="center">
            <Typography
                variant="h2"
                color="primary"
              >
                اكتب الايميل الخاص بك لاعادة تعيين كلمة السر
            </Typography>
          </Grid>

          <Grid item xs={12} align="center">
            <TextField
            label="الايميل"
            type="email"
            required
            autoFocus
            value={Email}
            onChange={(e) => {setEmail(e.target.value)}}
            className={classes.textField}
            />
          </Grid>

          <Grid item xs={12} align="center">

            <Button type="submit" variant="contained" endIcon={<BiReset color="white" /> } >اعد تعيين كلمة السر</Button>
          </Grid>
        </Grid>
      </form>
    </Grid>
    <Snackbar sx={{ width:400, }} open={snakeData[0]} autoHideDuration={15000} onClose={() => setSnakeData([false , "" , ""]) }>
            <Alert onClose={() => setSnakeData([false , "" , ""])} severity={snakeData[2] === "success" ? "success" : (snakeData[2] === "error" ?"error" :"info")} >
                {snakeData[1]}
            </Alert >
    </Snackbar>
  </Grid>
);


}

export default SubmitEmail;