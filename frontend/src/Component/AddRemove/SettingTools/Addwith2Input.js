import { useTheme } from "@emotion/react";
import {  Button, FormControl , Grid, IconButton, Stack, TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import {IoAddCircle} from "react-icons/io5"
import Addwithtags from "../../Addwithtages/Addwithtags";


export const Addwith2Input = ({ sendapi, obsen , label , setSnakeData  }) => {
  const theme = useTheme();
  const [cookies] = useCookies();
  const [selectedId , setSelectedId] = useState("");
  const [Name , setName] = useState("");

  console.log(sendapi, obsen , label);
  const HandleSubmit = async (e) => {
    e.preventDefault();
    if(Name.length === 0){
      setSnakeData([true, "قم بملي اسم المجموعه من فضلك " , "error"])
      return ;
    }
    if(selectedId.length === 0){
      setSnakeData([true, "الخاص المجموعه من فضلك Id  قم بملي ال " , "error"])
      return ;
    }


    
    const auth = "Bearer " + cookies.token;
    let ob={}; ob["activityGroupName"] = Name;
    ob["activityGroupID"] = selectedId;
    await axios.post(sendapi, ob,{headers:{authorization: auth,}})
    .then(res => { 
        setSnakeData([true, ` تمت اضافة ${Name} بنجاح` , "success"]);
    } )
    .catch((err) =>{
        setSnakeData([true, err.response.data.message , "error"])
      });
  }

    return(
        <Grid item container  xs={10} md={10}>
            <Grid item container  xs={12} md={12} spacing={3} >
              <Grid item xs={12} >
              <TextField
                variant="outlined"
                fullWidth
                sx={{maxWidth: 530,}}
                placeholder={`اضف اسم للمجموعه`}
                label={`اضف اسم للمجموعه`}
                onChange={(e) => setName(e.target.value)}
              />
              </Grid>
              <Grid item xs={12} >
              <TextField
                variant="outlined"
                fullWidth
                sx={{maxWidth: 530,}}
                placeholder={`للمجموعه Id اضف `}
                label={`للمجموعه Id اضف `}
                onChange={(e) => setSelectedId(e.target.value)}
              />
              </Grid>
              <Grid item xs={12} style={{textAlign: "end"}}>
                <Button onClick={HandleSubmit} variant="contained" startIcon={<IoAddCircle />}>اضف</Button>
              </Grid>
            </Grid>
        </Grid>
    );
}
export default Addwith2Input;