import { useTheme } from "@emotion/react";
import {  Autocomplete, Button, FormControl , Grid, IconButton, Stack, TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { BsImageFill } from "react-icons/bs";
import {IoAddCircle} from "react-icons/io5"
import { baseapi } from "../../../Utilities/utilitesFunction";
import Addwithtags from "../../Addwithtages/Addwithtags";
import DropDownwithapi from "../../MultiStepForm/DropDownwithapi";
import { VisibalePassword } from "../../VisibalePassword/VisibalePassword";


export const ChangeProjectImg = ({ setSnakeData  }) => {
  const theme = useTheme();
  const [cookies] = useCookies();
  const [Imgs , setImgs] = useState([]);
  const [allselections , setallselections] = useState([]);
  const [selection , setselection] = useState(""); 


  const UploadImgs = (e) => {
    if (e) setImgs([...Imgs, e]);
  }

  const HandleSubmit = async (e) => {
    e.preventDefault();
    if(selection.length === 0){
        setSnakeData([true, `من فضلك اختر المشروع التي تود تغييره ` , "error"]);
        return ;
    }
    if( Imgs.length === 0){
      setSnakeData([true, `من فضلك ارفق صوره ` , "error"]);
      return ;
    }
    let formData = new FormData();
    formData.append('map', Imgs[0].target.files[0]);
    const auth = "Bearer " + cookies.token;
    console.log(baseapi +"/projects/"+selection["_id"]);
    await axios.patch(baseapi +"/projects/"+selection["_id"] , formData,{headers:{authorization: auth,}})
    .then(res => { 
        console.log(res)
        setSnakeData([true, ` تم تغيير الصوره بنجاح ` , "success"]);
    } )
    .catch((err) =>{
        setSnakeData([true, err.response.data.message , "error"])
      });
    
  }

    return(
        <Grid item container  xs={10} md={10} >
            <Grid item container  xs={12} md={12} spacing={3} justifyContent="center" >
              <Grid item xs={12} md={12} textAlign="center" >
                <DropDownwithapi
                setselection={setselection}
                chose="projectCode"
                getapi="/projects"
                label="مشاريع"
                setSnakeData={setSnakeData}
                />
              </Grid>
            
              <Grid item xs={12} style={{textAlign: "center"}}>
                <Button variant="contained" startIcon={<BsImageFill color="white" />} sx={{ marginRight: 1}} component="label" onChange={UploadImgs}>
                     ارفق الخريطه الجديده
                    <input hidden accept="image/*" type="file" />
                </Button>
                <Button onClick={HandleSubmit} variant="contained" startIcon={<IoAddCircle />}>اضف</Button>
              </Grid>
            </Grid>
        </Grid>
    );
}
export default ChangeProjectImg;
