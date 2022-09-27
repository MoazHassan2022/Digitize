import { Alert, Avatar, Button,  Grid,  IconButton,  InputAdornment,  Paper, Snackbar, TextField, Typography } from "@mui/material";
import { useState } from "react";
import useStyle from "./AddSuperVisorFormStyles";
import {  useCookies } from "react-cookie";
import axios from "axios";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { useTheme } from "@emotion/react";
import {GrUserAdd} from "react-icons/gr";
import {baseapi} from "../../Utilities/utilitesFunction"


export const AddSuperVisorForm = () => {
  const classes = useStyle();
  const [cookies] = useCookies(['user']);
  const theme = useTheme();


  const [Name , setNAme] = useState("");
  const [Email , setEmail] = useState("");
  const [ConfirmPassWord , setConfirmPassWord] = useState("");
  const [PassWord , setPassWord] = useState("");
  const [snakeData, setSnakeData] = useState([false,"","error"]);

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);


  const HandleSubmit = (e) =>{
    e.preventDefault();
    const supervisor = {
        "name": Name,
        "email" : Email,
        "password" : PassWord,
        "passwordConfirm" : ConfirmPassWord,
    };
    const auth = "Bearer " + cookies.token;
    axios.post(baseapi + "/users/signup", supervisor,{headers:{
      authorization: auth,
    }})
    .then(res => { 
        setSnakeData([true, "تم اضافة مشرف جديد" , "success"]);
        setTimeout( () => window.location.reload() , 3000 );
    } )
    .catch((err) =>
        setSnakeData([true, err.response.data.message , "error"])
    )
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
                <Avatar variant="rounded" sx={{ width: "auto", height: "auto", transform:"scale(.4)" }} src="/public/Assets/Digitize.png" alt="CO" />
          </Grid>

          <Grid item xs={12} textAlign="center">
            <Typography
                variant="h2"
                color="primary"
              >
              اضف مشرف جديد
            </Typography>
          </Grid>

          <Grid item xs={12} align="center">
            <TextField
            label="الاسم"
            type="text"
            required
            value={Name}
            onChange={(e) => {setNAme(e.target.value)}}
            className={classes.textField}
            />
          </Grid>

          <Grid item xs={12} align="center">
              <TextField
              label="الايميل"
              type="email"
              required
              value={Email}
              onChange={(e) => {setEmail(e.target.value)}}
              className={classes.textField}
              helperText="كن حذرا فهذا الايميل سيستخدم في حالة نسيان الباسورد"
              />
          </Grid>

          <Grid item xs={12} align="center">
            <TextField
            label="الباسورد"
            required
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
            label="اكتب الباسورد مجددا"
            required
            value={ConfirmPassWord}
            onChange={(e) => {setConfirmPassWord(e.target.value)}}
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
            <Button type="submit" variant="contained" endIcon={<GrUserAdd size={24}/> } >اضف المشرف الجديد</Button>
          </Grid>
        </Grid>
      </form>
    </Grid>
    <Snackbar sx={{ width:400, }} open={snakeData[0]} autoHideDuration={3000} onClose={() => setSnakeData([false , "" , ""]) }>
            <Alert onClose={() => setSnakeData([false , "" , ""])} severity={snakeData[2].toString()} >
                {snakeData[1]}
            </Alert >
    </Snackbar>
  </Grid>
);


}

export default AddSuperVisorForm;