import { Alert, Avatar, Button,  Grid,  IconButton,  InputAdornment,  Link,  Paper, Snackbar, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import {BiLogInCircle } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import useStyle from "./SignInStyles";
import {  useCookies } from "react-cookie";
import axios from "axios";
import {MdVisibility , MdVisibilityOff} from "react-icons/md"
import { useTheme } from "@emotion/react";
import {baseapi} from "../../Utilities/utilitesFunction"

export const SignIn = () => {
  const classes = useStyle();
  const history = useNavigate();
  const [cookies, setCookie] = useCookies(['user']);
  const theme = useTheme();

  const [Email , setEmail] = useState("");
  const [PassWord , setPassWord] = useState("");
  const [snakeData, setSnakeData] = useState([false,"",""]);

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  
  const HandleSubmit = async (e) =>{
    e.preventDefault();
    let user = {
        "email" : Email,
        "password" : PassWord,
    };

    axios.post(baseapi + "/users/login", user)
    .then(res => { 
        setCookie('token', res.data.token, { path: '/' });
        setCookie('email', res.data.data.user.email, { path: '/' });
        setCookie('name', res.data.data.user.name, { path: '/' });
        setCookie('userType', res.data.data.user.isAdmin ? "1" : "0", { path: '/' });
        setCookie('id', res.data.data.user._id, { path: '/' });
        setSnakeData([true, "You Login successfully!" , "success"]);
         if(!res.data.data.user.isAdmin){ setTimeout(history("/SubmitSurvy") , 5000 );}
         else {setTimeout(history("/RequestData") , 5000 );}
    } )
    .catch((err) =>{
        setSnakeData([true, err.response.data.message , "error"])
      });
  }

  useEffect(()=>{
    if(cookies.token !== "undefined"){
      if(cookies.userType === "0"){ setTimeout(history("/SubmitSurvy") , 5000 );}
      else {setTimeout(history("/RequestData") , 5000 );}
    }
      // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

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
                قم بالتسجيل بالحساب الخاص بك
            </Typography>
          </Grid>

          <Grid item xs={12} align="center">
            <TextField
            label="ايميل"
            type="email"
            required
            autoFocus
            value={Email}
            onChange={(e) => {setEmail(e.target.value)}}
            className={classes.textField}
            />
          </Grid>

          <Grid item xs={12} align="center">
            <TextField
            label="باسورد"
            required
            autoFocus
            value={PassWord}
            onChange={(e) => {setPassWord(e.target.value)}}
            type={showPassword ? "text" : "password"}
            InputProps={{ // <-- This is where the toggle button is added.
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <MdVisibility color={theme.palette.primary.main} size={24} /> : <MdVisibilityOff size={24}/>}
                  </IconButton>
                </InputAdornment>
              )
            }}
            className={classes.textField}
            />
          </Grid>
          <Grid item xs={12} md={12} align="center">
            <Link onClick={() => history("/SubmitEmail")} sx={{ textDecoration:"none" , cursor:"pointer" }}>هل نسيت الباسورد الخاص بك ؟اضغط لاعادة التعيين</Link>
          </Grid>
          <Grid item xs={12} align="center">
            <Button type="submit" variant="contained" endIcon={<BiLogInCircle /> } >سجل الدخول</Button>
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

export default SignIn;