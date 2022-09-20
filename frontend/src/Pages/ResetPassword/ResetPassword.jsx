import { Alert, Avatar, Button,  Grid,  IconButton,  InputAdornment,  Paper, Snackbar, TextField, Typography } from "@mui/material";
import { useState } from "react";
import {BiLogInCircle } from "react-icons/bi";
import { useNavigate, useParams } from "react-router-dom";
import useStyle from "./ResetPasswordStyles";
import axios from "axios";
import {MdVisibility , MdVisibilityOff} from "react-icons/md"
import { useTheme } from "@emotion/react";
import { baseapi } from "../../Utilities/utilitesFunction";

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
        setSnakeData([true, "تم اعادة تعيين الباسورد الخاص بك بنجاح سيتم توجيهك لصفحة الدخول مرة اخري" , "success"]);
        setTimeout(() =>{history("/")}, 5000);
    })
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
                <Avatar variant="rounded" sx={{ width: "auto", height: "auto", transform:"scale(.4)" }} src="/Assets/Digitize.png" alt="CO" />
          </Grid>

          <Grid item xs={12} textAlign="center">
            <Typography
                variant="h2"
                color="primary"
              >
                اعد تعيين الباسورد الخاص بك
            </Typography>
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

          <Grid item xs={12} align="center">
            <TextField
            label="قم بتاكيد الباسورد"
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
        </Grid>
      </form>
    </Grid>
    <Snackbar sx={{ width:400, }} open={snakeData[0]} autoHideDuration={3000} onClose={() => setSnakeData([false , "" , ""]) }>
            <Alert onClose={() => setSnakeData([false , "" , ""])} severity={snakeData[2] === "success" ? "success" : (snakeData[2] == "error" ?"error" :"info")} >
                {snakeData[1]}
            </Alert >
    </Snackbar>
  </Grid>
);


}

export default Resetpassword;