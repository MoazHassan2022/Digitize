import { Alert, Avatar, Button,  Grid,  IconButton,  InputAdornment,  Paper, Snackbar, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import {BiLogInCircle } from "react-icons/bi";
import { useNavigate, useParams } from "react-router-dom";
import useStyle from "./ResetPasswordStyles";
import axios from "axios";
import {MdVisibility , MdVisibilityOff} from "react-icons/md"
import { useTheme } from "@emotion/react";
import { LogoPath, baseapi, mediaApi } from "../../Utilities/utilitesFunction";
import FormContainer from "../../Component/FormContainer/FormContainer";

export const Resetpassword = () => {
  const classes = useStyle();
  const history = useNavigate();
  const theme = useTheme();

  const { id } = useParams();


  const [PassWord , setPassWord] = useState("");
  const [PassWordConfirm , setPassWordConfirm] = useState("");

  const [snakeData, setSnakeData] = useState([false,"",""]);

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  
  const HandleSubmit = async (e) =>{
    e.preventDefault();
    let user = { 
      "password": PassWord,
    "passwordConfirm": PassWordConfirm,
  }
    ;
    axios.patch(baseapi +`/users/resetPassword/${id}`, user)
    .then(res => { 
        setSnakeData([true, "تم اعادة تعيين كلمة السر الخاص بك بنجاح سيتم توجيهك لصفحة الدخول مرة اخري" , "success"]);
        setTimeout(() =>{history("/")}, 5000);
    })
    .catch((err) =>{
        setSnakeData([true, err.response.data.message , "error"])
      });
  }


return (
  <>
  <FormContainer Title={<Typography alignSelf="end" sx={{ color: "white" }} variant="h2">غير كلمة السر الخاصة بك</Typography>}>
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
                                sx={{ width: "100%", height: "auto", transform: "scale(.6)"}}
                                src={mediaApi + LogoPath} alt="Digitize" />
          </Grid>

          <Grid item xs={12} textAlign="center">
            <Typography
                variant="h2"
                color="primary"
              >
                اعد تعيين كلمة السر الخاص بك
            </Typography>
          </Grid>

          <Grid item xs={12} align="center">
              <TextField
              label="كلمة السر"
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

          <Grid item xs={12} align="center">
            <TextField

            label="قم بتاكيد كلمة السر"
            required
            autoFocus
            value={PassWordConfirm}
            onChange={(e) => {setPassWordConfirm(e.target.value)}}
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

          <Grid item xs={12} align="center">
            <Button type="submit" variant="contained" endIcon={<BiLogInCircle /> } >اعد التعيين</Button>
          </Grid>
          
          </Stack>
    </Grid>
    </FormContainer>


    <Snackbar sx={{ width:400, }} open={snakeData[0]} autoHideDuration={3000} onClose={() => setSnakeData([false , "" , ""]) }>
            <Alert onClose={() => setSnakeData([false , "" , ""])} severity={snakeData[2] === "success" ? "success" : (snakeData[2] === "error" ?"error" :"info")} >
                {snakeData[1]}
            </Alert >
    </Snackbar>
    </>
);


}

export default Resetpassword;