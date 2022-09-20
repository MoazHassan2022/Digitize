import { useTheme } from "@emotion/react";
import {  Button, FormControl , Grid, IconButton, Stack, TextField } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { BsImageFill } from "react-icons/bs";
import { GiConsoleController } from "react-icons/gi";
import {IoAddCircle} from "react-icons/io5"
import Addwithtags from "../../Addwithtages/Addwithtags";
import { VisibalePassword } from "../../VisibalePassword/VisibalePassword";


export const AddProject = ({ sendapi, obsen , label , setSnakeData  }) => {
  const theme = useTheme();
  const [cookies] = useCookies();
  const [enterdtext , setEnterdtext] = useState("");
  const [Imgs , setImgs] = useState([]);


  const UploadImgs = (e) => {
    if (e) setImgs([...Imgs, e]);
  }
  
  const HandleSubmit = async (e) => {
    e.preventDefault();
    if(enterdtext.length === 0){
      setSnakeData([true, `من فضلك قم بملي احدي ال${label} عل الاقل` , "error"])
      return ;
    }
    let formData = new FormData();
    formData.append(obsen, enterdtext);
    formData.append('map', Imgs[0].target.files[0]);

    const auth = "Bearer " + cookies.token;
    await axios.post(sendapi, formData,{headers:{authorization: auth,}})
    .then(res => { 
        setSnakeData([true, ` تمت اضافة ${enterdtext} بنجاح` , "success"]);
    } )
    .catch((err) =>{
        setSnakeData([true, err.response.data.message , "error"])
      });
    
  }


    return(
        <Grid item container  xs={10} md={10}>
          <form >
            <Grid item container  xs={12} md={12} spacing={3} >
              <Grid item xs={12} >
              <TextField
                variant="outlined"
                fullWidth
                sx={{maxWidth: 530,}}
                label={`اضف مشروع`}
                onChange={(e)=>setEnterdtext(e.target.value)}
              />
              </Grid>
            
              <Grid item xs={12} style={{textAlign: "end"}}>
                <Button variant="contained" startIcon={<BsImageFill color="white" />} sx={{ marginRight: 1}} component="label" onChange={UploadImgs}>
                     ارفق خريطة الموقع
                    <input hidden accept="image/*" type="file" />
                </Button>
                <Button onClick={HandleSubmit} variant="contained" startIcon={<IoAddCircle />}>اضف</Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
    );
}
export default AddProject;
