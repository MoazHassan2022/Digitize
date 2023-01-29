import { Alert, Avatar, Box, Button,  Grid,  Paper, Snackbar ,Typography } from "@mui/material";
import { useEffect, useState } from "react";
import useStyle from "./RequestDataFormStyles";
import {  useCookies } from "react-cookie";
import axios from "axios";
import {getSelectedone , baseapi, mediaApi} from "../../Utilities/utilitesFunction"
import {AiOutlineDownload} from "react-icons/ai"
import {FiEdit} from "react-icons/fi"
import DropDownwithselctions from "../MultiStepForm/DropDownwithselctions";


export const RequestDataForm = ({setEdit, selecteddata}) => {
  const classes = useStyle();
  const [cookies] = useCookies(['user']);

  const [projectsData , setprojectsData ] = useState("");

  const SiteNameTitle = "اختر المشروع";
  const [SiteNames, setSitesNames] = useState([]);
  const [snakeData, setSnakeData] = useState([false,"",""]);
  const [selectedproject, setselectedproject] = useState(null);

  const requestAvailabeleSites = async () => {
    const auth = "Bearer " + cookies.token;
    await axios.get(baseapi+"/projects" ,
      {headers:{
        authorization: auth,
      }}
      ).then(response =>{
        let codes = [], temp = [{"projectCode" : "all"}];
        temp = temp.concat(response.data.data.data)
        setprojectsData(temp);
        temp.map(pro =>  codes.push(pro.projectCode) )
        setSitesNames(codes);
      }).catch((err) => {
        setSnakeData([true, err.response.data.message , "error"]);
      });
}

  const HandleSubmit = async (e) =>{
    e.preventDefault();
    const reqcomplete = selectedproject["projectCode"] === "all" ? "/rows/excel" :`/rows/excel?projectCode=${selectedproject['projectCode']}` ;
    const auth = "Bearer " + cookies.token;
    let anchor = document.createElement("a");

    fetch(baseapi + reqcomplete, {headers:{authorization: auth,}})
    .then(response => response.blob())
    .then(blobby => {
        let objectUrl = window.URL.createObjectURL(blobby);
        anchor.href = objectUrl;
        anchor.download = 'data.xlsx';
        anchor.click();
        window.URL.revokeObjectURL(objectUrl);

        setTimeout(() => {
          setSnakeData([true, "تم تنزيل البيانات بنجاح" , "success"]);
        }, 2000);
        setTimeout(() => {
          window.location.reload();
        }, 4000);
    });

  }
  
  const tempfunc = (valu) =>{
    setselectedproject(getSelectedone(valu ,projectsData , "projectCode" ));
  }

  const editdataButton = () =>{
    if(!selectedproject)
    {
      setSnakeData([true, "من فضلك قم باختيار البيانات المطلوب تعديلها" , "error"]);
      return;
    }
    setEdit(false);
    selecteddata(selectedproject["projectCode"]);
  }

  useEffect(() => {
    requestAvailabeleSites();   
    return () => {
    }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    } , [])
  return (
    <Grid 
    container 
    alignItems="center"
    justifyContent="center"
    className={classes.SignPage}
    > 
      <Grid item container xs={12} md={8} direction="column" alignItems="center" justifyContent="center" >
        <form className={classes.Form} onSubmit={HandleSubmit}>
          <Grid item container xs={12} md={12} component={Paper} direction="row" spacing={4} className={classes.SignCard} alignItems="center" justifyContent="center">
            <Grid item className={classes.Logo} xs={12} >
                  <Avatar variant="rounded" sx={{ width: "auto", height: "auto", transform:"scale(.4)" }} src={mediaApi + "/Assets/Digitize.png"} alt="CO" />
            </Grid>
  
            <Grid item xs={12} textAlign="center">
              <Typography
                  variant="h2"
                  color="primary"
                >
                  طلب سحب بيانات
              </Typography>
            </Grid>
  
            <Grid item xs={12} align="center">
                <Box className={classes.selectionBox}>
                  <DropDownwithselctions key={99} selections={SiteNames} setselection={tempfunc}   label={SiteNameTitle} />
                </Box>
            </Grid>
  

            <Grid item container xs={12} md={6} align="center">
              <Grid item xs={6} align="center">
                <Button type="submit" variant="contained" endIcon={<AiOutlineDownload /> }  >تنزيل البيانات</Button>
              </Grid>
              <Grid item xs={6} align="center">
                <Button type="button" variant="contained" onClick={editdataButton} endIcon={<FiEdit /> }  >تعديل البيانات</Button>
              </Grid>
            </Grid>




            
          </Grid>
        </form>
      </Grid>
      <Snackbar sx={{ width:400, }} open={snakeData[0]} autoHideDuration={3000} onClose={() =>  setSnakeData([false , "" , ""]) }>
              <Alert onClose={() => setSnakeData([false , "" , ""])} severity={snakeData[2] === "success" ? "success" : (snakeData[2] === "error" ?"error" :"info")} >
                  {snakeData[1]}
              </Alert >
      </Snackbar>
    </Grid>
  );
  
}

export default RequestDataForm;
