import {
  Button,
  FormHelperText,
  FormLabel,
  Grid,
  Paper,
  Stack,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { CgPassword } from "react-icons/cg";
import { baseapi } from "../../Utilities/utilitesFunction";
import TextFieldWithShowPassword from "../TextFieldWithShowPassword/TextFieldWithShowPassword";

export const ChangePassword = ({ setSnakeData }) => {
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
      direction='row'
      component={Paper}
      sx={{ padding: 6, border: "5px solid", borderRadius: 6 }}
      xs={10}
      sm={8}
      md={6}
      justifyContent='space-around'
      alignItems='center'
    >
      <Stack
        component={"form"}
        onSubmit={HandleSubmit}
        direction='column'
        justifyContent='center'
        alignItems='center'
        spacing={4}
      >
        <Grid item xs={12} alignItems='flex-start' justifyContent='flex-start'>
          <FormLabel component='legend' sx={{ margin: 1 }}>
            اكنب كلمة السر القديمة
          </FormLabel>

          <TextFieldWithShowPassword
            key={54}
            Label={"كلمة السر الحالية"}
            PassWord={OldPassword}
            setPassWord={setOldPassword}
          />
        </Grid>

        <Grid item xs={12} align='center'>
          <TextFieldWithShowPassword
            key={55}
            Label={"كلمة السر الجديدة"}
            PassWord={NewPassWord}
            setPassWord={setNewPassWord}
          />
          <FormHelperText>
            اجعل كلمة السر قوية كفاية لكي لا تكون سهلة الملاحظة
          </FormHelperText>
        </Grid>

        <Grid item xs={12} align='center'>
          <TextFieldWithShowPassword
            key={56}
            Label={"تاكيد كلمة السر الجديدة"}
            PassWord={ConfirmNewPassword}
            setPassWord={setConfirmNewPassword}
          />
        </Grid>

        <Grid item xs={12} align='center'>
          <Button type='submit' variant='contained' endIcon={<CgPassword />}>
            غير كلمة السر
          </Button>
        </Grid>
      </Stack>
    </Grid>
  );
};

export default ChangePassword;
