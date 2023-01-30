import {   Button, Grid, Stack } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { BsImageFill } from "react-icons/bs";
import {IoAddCircle} from "react-icons/io5"
import { baseapi } from "../../../Utilities/utilitesFunction";
import DropDownwithapi from "../../MultiStepForm/DropDownwithapi";


export const ChangeProjectImg = ({ setSnakeData  }) => {
  const [cookies] = useCookies();
  const [Imgs , setImgs] = useState([]);
  const [selection , setselection] = useState(""); 
  const [stopsubmit , setstopsubmit] = useState(false);
  const UploadImgs = (e) => {
    if (e) setImgs([...Imgs, e]);
  }

  const HandleSubmit = async (e) => {
    e.preventDefault();
    if(selection.length === 0){
        setSnakeData([true, `من فضلك اختر المشروع التي تود تغييرة ` , "error"]);
        return ;
    }
    if( Imgs.length === 0){
      setSnakeData([true, `من فضلك ارفق صورة ` , "error"]);
      return ;
    }
    let formData = new FormData();
    formData.append('map', Imgs[0].target.files[0]);
    const auth = "Bearer " + cookies.token;
    await axios.patch(baseapi +"/projects/"+selection["_id"] , formData,{headers:{authorization: auth,}})
    .then(res => { 
        setstopsubmit(false);
        setSnakeData([true, ` تم تغيير الصورة بنجاح ` , "success"]);
        setstopsubmit(false);
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
                disNext={setstopsubmit}
                setselection={setselection}
                chose="projectCode"
                getapi="/projects"
                label="مشاريع"
                setSnakeData={setSnakeData}
                />
              </Grid>
              <Grid item xs={12} style={{textAlign: "center"}}>
            
              <Stack
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  spacing={2}
                  >
                <Button variant="contained" startIcon={<BsImageFill color="white" />} sx={{ marginRight: 1}} component="label" onChange={UploadImgs}>
                     ارفق الخريطة الجديدة
                    <input hidden accept="image/*" type="file" />
                </Button>

                <Button onClick={HandleSubmit} variant="contained" disabled={stopsubmit} startIcon={<IoAddCircle />}>اضف</Button>
</Stack>

              </Grid>

            </Grid>
        </Grid>
    );
}
export default ChangeProjectImg;