import { Alert, Avatar, Button,  Grid,  Paper, Snackbar, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import {BiReset } from "react-icons/bi";
import useStyle from "./SubmitEmailStyles";
import axios from "axios";
import { LogoPath, baseapi, mediaApi } from "../../Utilities/utilitesFunction";
import FormContainer from "../../Component/FormContainer/FormContainer";

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
  <>
  <FormContainer Title={<Typography alignSelf="end" sx={{ color: "white" }} variant="h2">اعد تعيين كلمه السر</Typography>}>
  <Grid
      container
      direction="row"
      component={Paper}
      sx={{ padding: 6, border: "5px solid", borderRadius: 6 }}
      xs={10}
      sm={8}
      md={6}
      justifyContent="space-around"
      alignItems="center"
    >
      <Stack
        component={"form"}
        onSubmit={HandleSubmit}
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={4}
      >

          <Grid item className={classes.Logo} xs={12} >
                <Avatar variant="rounded" 
                                sx={{ width: "100%", height: "auto", transform: "scale(.7)"}}
                                src={mediaApi + LogoPath} alt="CO" />
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

          </Stack>
    </Grid>
    </FormContainer>
    <Snackbar sx={{ width:400, }} open={snakeData[0]} autoHideDuration={15000} onClose={() => setSnakeData([false , "" , ""]) }>
            <Alert onClose={() => setSnakeData([false , "" , ""])} severity={snakeData[2] === "success" ? "success" : (snakeData[2] === "error" ?"error" :"info")} >
                {snakeData[1]}
            </Alert >
    </Snackbar>
  </>
);


}

export default SubmitEmail;