import {  Button,  Grid,  TextField } from "@mui/material";
import { Stack } from "@mui/system";
import axios from "axios";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { BsImageFill } from "react-icons/bs";
import {IoAddCircle} from "react-icons/io5"


export const AddProject = ({ sendapi, obsen , label , setSnakeData  }) => {
  const [cookies] = useCookies();
  const [enterdtext , setEnterdtext] = useState("");
  const [Imgs , setImgs] = useState();


  const UploadImgs = (e) => {
    if (e) { 
      setImgs(e);
      setSnakeData([true, "تم رفع الخريطة بنجاح", "success"]);
    }
  }
  
  const HandleSubmit = async (e) => {
    e.preventDefault();
    if(enterdtext.length === 0){
      setSnakeData([true, `من فضلك قم بملي احدي ال${label} عل الاقل` , "error"])
      return ;
    }
    let formData = new FormData();
    formData.append(obsen, enterdtext);
    if(Imgs !== undefined){
      let x = Imgs.target.files[0];
      formData.append('map', x);
    }
    const auth = "Bearer " + cookies.token;
    await axios.post(sendapi, formData,{headers:{authorization: auth,}})
    .then(res => { 
        setSnakeData([true, ` تمت اضافة البيانات بنجاح` , "success"]);
    } )
    .catch((err) =>{
        setSnakeData([true, err.response.data.message , "error"])
      });
    
  }


    return(
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
                <Stack
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  spacing={2}
                  >
                  <Button variant="contained" startIcon={<BsImageFill color="white" />} sx={{ marginRight: 1}} component="label" onChange={UploadImgs}>
                        ارفق خريطة 
                      <input hidden accept="image/*" type="file" />
                  </Button>
                  <Button onClick={HandleSubmit} variant="contained" startIcon={<IoAddCircle />}>اضف</Button>
                </Stack>
              </Grid>
        </Grid>
    );
}
export default AddProject;
