import { useTheme } from "@emotion/react";
import {  Button, FormControl , Grid, IconButton, Stack, TextField } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useCookies } from "react-cookie";
import {IoAddCircle} from "react-icons/io5"
import Addwithtags from "../../Addwithtages/Addwithtags";


export const AddwithoutSelction = ({ sendapi, obsen , label , setSnakeData  }) => {
  const theme = useTheme();
  const [cookies] = useCookies();
  const [enterdtext , setEnterdtext] = useState("");
  
  const HandleSubmit = async (e) => {
    e.preventDefault();
    if(enterdtext.length === 0){
      setSnakeData([true, `من فضلك قم بملي احدي ال${label} عل الاقل` , "error"])
      return ;
    }
    enterdtext.map(p => add(p));
  }

  const add = async (pp) =>{
    let ob={}; ob[obsen] = pp;
    const auth = "Bearer " + cookies.token;
    await axios.post(sendapi, ob,{headers:{authorization: auth,}})
    .then(res => { 
        setSnakeData([true, ` تمت اضافه ${pp} بنجاح` , "success"]);
    } )
    .catch((err) =>{
        setSnakeData([true, err.response.data.message , "error"])
      });
  }

  function handleSelecetedTags(items) {
    setEnterdtext(items)
  }

    return(
        <Grid item container  xs={10} md={10}>
          <form >
            <Grid item container  xs={12} md={12} spacing={3} >
              <Grid item xs={12} >
              <Addwithtags
                selectedTags={handleSelecetedTags}
                variant="outlined"
                fullWidth
                sx={{maxWidth: 530,}}
                placeholder={`اضف ${label}`}
                label={`اضف ${label}`}
              />
              </Grid>
            

            
              <Grid item xs={12} style={{textAlign: "end"}}>
                <Button onClick={HandleSubmit} variant="contained" startIcon={<IoAddCircle />}>اضف</Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
    );
}
export default AddwithoutSelction;