import { Alert, Avatar, Button,  Grid,  IconButton,  InputAdornment,  Link,  Paper, Snackbar, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import {BiLogInCircle } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import useStyle from "./SignInStyles";
import {  useCookies } from "react-cookie";
import axios from "axios";
import {MdVisibility , MdVisibilityOff} from "react-icons/md"
import { useTheme } from "@emotion/react";
import {LogoPath, baseapi, mediaApi} from "../../Utilities/utilitesFunction"
import { AiFillFacebook, AiFillInstagram, AiFillLinkedin } from "react-icons/ai";
import { IoMailSharp } from "react-icons/io5";

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
        setSnakeData([true, "تم تسجيل الدخول بنجاح!" , "success"]);
        setTimeout( () =>  window.location.reload() , 2000 );
    } )
    .catch((err) =>{
        setSnakeData([true, err.response.data.message , "error"])
      });
  }

  useEffect(()=>{
    if(cookies.token && cookies.token !== "undefined"){
      if(cookies.userType === "0"){ setTimeout(history("/SubmitSurvey") , 5000 );}
      else {setTimeout(history("/RequestData") , 5000 );}
    }
      // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

return (
  <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      className={classes.BackGound}
    >
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        xs={11}
        sx={{ bgcolor: "#f2f5fa", borderRadius: "1.3rem", minHeight: "75vh" }}
      >
        <Grid item container xs={11} md={4}>
          <Grid
            component={"form"}
            onSubmit={HandleSubmit}
            container
            spacing={4}
            justifyContent="center"
            alignItems="center"
          >
            <Grid item sx={{ margin: "auto" }} xs={12}>
              <Avatar
                variant="rounded"
                sx={{ width: "auto", height: "auto", transform: "scale(.45)" }}
                src={mediaApi + LogoPath}
                alt="CO"
              />
            </Grid>
            <Grid item xs={12} textAlign="center">
              <Typography variant="h2" color="primary">
                قم بالتسجيل بالحساب الخاص بك
              </Typography>
            </Grid>

            <Grid item xs={12} align="center" justifyContent="center">
              <TextField
                label="ايميل"
                type="email"
                required
                autoFocus
                value={Email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                sx={{ width: { xs: "90%", sm: "60%", md: "60%" } }}
              />
            </Grid>

            <Grid item xs={12} align="center" justifyContent="center">
              <TextField
                className={classes.TextFiled}
                label="كلمة السر"
                required
                value={PassWord}
                onChange={(e) => {
                  setPassWord(e.target.value);
                }}
                sx={{ width: { xs: "90%", sm: "60%", md: "60%" } }}
                type={showPassword ? "text" : "password"}
                InputProps={{
                  // <-- This is where the toggle button is added.
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? (
                          <MdVisibility
                            color={theme.palette.primary.main}
                            size={24}
                          />
                        ) : (
                          <MdVisibilityOff size={24} />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} md={12} align="center">
              <Link
                onClick={() => history("/SubmitEmail")}
                sx={{ textDecoration: "none", cursor: "pointer" }}
              >
                هل نسيت كلمة السر الخاص بك ؟اضغط لاعادة التعيين
              </Link>
            </Grid>
            <Grid item xs={12} align="center">
              <Button
                type="submit"
                variant="contained"
                endIcon={<BiLogInCircle />}
                size="large"
              >
                سجل الدخول
              </Button>
            </Grid>
            <Grid item xs={12} align="center">
              <IconButton href="https://www.instagram.com/" sx={{fontSize:"40px", color:"#962fbf"}}><AiFillInstagram /> </IconButton>
              <IconButton href="https://www.facebook.com/" color="primary" sx={{fontSize:"40px"}}><AiFillFacebook /> </IconButton>
              <IconButton href="https://www.linkedin.com/"  sx={{fontSize:"40px", color:"#0A66C2"}}><AiFillLinkedin /> </IconButton>
              <IconButton href="mailto:info@componay.org"  sx={{fontSize:"40px", color:"#BB001B"}}><IoMailSharp /> </IconButton>
            </Grid>

          </Grid>
        </Grid>

        <Grid
          item
          xs={0}
          md={8}
          className={classes.Right}
          display={{ xs: "none", md: "flex" }}
        ></Grid>
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