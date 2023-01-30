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
        setSnakeData([true, "تم تغيير كلمة السر الخاص بك بنجاح", "success"]);
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
          <FormLabel component="legend">اكنب كلمة السر القديمة</FormLabel>
          <TextField
            label="كلمة السر الحالية"
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
            label="كلمة السر الجديدة"
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
            اجعل كلمة السر قوية كفاية لكي لا تكون سهلة الملاحظة
          </FormHelperText>
        </Grid>

        <Grid item xs={12} align="center">
          <TextField
            label="تاكيد كلمة السر الجديدة"
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
