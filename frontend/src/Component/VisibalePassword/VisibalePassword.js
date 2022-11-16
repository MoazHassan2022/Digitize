import { IconButton, InputAdornment, TextField, useTheme } from "@mui/material";
import { useState } from "react";
import {MdVisibility , MdVisibilityOff} from "react-icons/md"


export const VisibalePassword = ({p , setp}) => {
    const theme = useTheme();

  const [PassWord , setPassWord] = useState(p);
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

    return (
    <TextField
            label="كلمة السر"
            required
            value={PassWord}
            onChange={(e) => {setPassWord(e.target.value); setp(e.target.value)}}
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
            sx={{ borderRadius:2 ,width:"100%" }}

            />
            )

}