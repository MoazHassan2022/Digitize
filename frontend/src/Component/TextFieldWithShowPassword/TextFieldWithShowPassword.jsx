import { IconButton, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { useTheme } from "@emotion/react";

export const TextFieldWithShowPassword = ({ Label, PassWord, setPassWord }) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  const theme = useTheme();

  return (
    <TextField
      label={Label}
      required
      value={PassWord}
      onChange={(e) => {
        console.log(e.target.value);
        setPassWord(e.target.value);
      }}
      sx={{ width: "15rem" }}
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
                <MdVisibility color={theme.palette.primary.main} size={24} />
              ) : (
                <MdVisibilityOff size={24} />
              )}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default TextFieldWithShowPassword;
