import {
  Button,
  FormHelperText,
  FormLabel,
  Grid,
  Paper,
  Stack,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { CgPassword } from "react-icons/cg";
import { baseapi } from "../../Utilities/utilitesFunction";
import useStyle from "./ChangePasswordStyles";

export const ChangePassword = ({ setSnakeData }) => {
  const classes = useStyle();
  const [cookies] = useCookies(["user"]);

  const [OldPassword, setOldPassword] = useState("");
  const [NewPassWord, setNewPassWord] = useState("");
  const [ConfirmNewPassword, setConfirmNewPassword] = useState("");

  const HandleSubmit = (e) => {
    e.preventDefault();
    const auth = "Bearer " + cookies.token;
    let pass = {
      oldPassword: OldPassword,
      password: NewPassWord,
      passwordConfirm: ConfirmNewPassword,
    };

    axios
      .patch(baseapi + `/users/changePassword`, pass, {
        headers: { authorization: auth },
      })
      .then((res) => {
        setSnakeData([true, "تم تغيير كلمه السر الخاص بك بنجاح", "success"]);
        setTimeout(() => window.location.reload(), 2000);
      })
      .catch((err) => {
        setSnakeData([true, err.response.data.message, "error"]);
      });
  };

  return (
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
        <Grid item xs={12} alignItems="flex-start" justifyContent="flex-start">
          <FormLabel component="legend">اكنب كلمه السر القديمة</FormLabel>
          <TextField
            label="كلمه السر الحاليه"
            type="password"
            required
            autoFocus
            value={OldPassword}
            onChange={(e) => {
              setOldPassword(e.target.value);
            }}
            className={classes.textField}
          />
        </Grid>

        <Grid item xs={12} align="center">
          <TextField
            label="كلمه السر الجديده"
            type="text"
            required
            autoFocus
            value={NewPassWord}
            onChange={(e) => {
              setNewPassWord(e.target.value);
            }}
            className={classes.textField}
          />
          <FormHelperText>
            اجعل كلمه السر قويه كفاية لكي لا تكون سهله الملاحظه
          </FormHelperText>
        </Grid>

        <Grid item xs={12} align="center">
          <TextField
            label="تاكيد كلمه السر الجديده"
            type="Password"
            required
            autoFocus
            value={ConfirmNewPassword}
            onChange={(e) => {
              setConfirmNewPassword(e.target.value);
            }}
            className={classes.textField}
          />
        </Grid>

        <Grid item xs={12} align="center">
          <Button type="submit" variant="contained" endIcon={<CgPassword />}>
            Change Password
          </Button>
        </Grid>
      </Stack>
    </Grid>
  );
};

export default ChangePassword;
