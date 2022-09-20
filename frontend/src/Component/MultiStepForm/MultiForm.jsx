import { Alert, Avatar, Button,  Grid,  Link,  MobileStepper,  Paper, Snackbar, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import {HiLogin } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import useStyle from "./MultiFormStyles";
import {  useCookies } from "react-cookie";
import { useTheme } from "@emotion/react";
import { Box } from "@mui/system";
import {AiFillFileText} from "react-icons/ai"
import { Stack } from '@mui/material';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { DropDownwithapi } from './DropDownwithapi';
import ManualInsert from './ManualInsert';
import { Fragment } from "react";
import axios from "axios";
import AutoCompleteFreesolo from "./AutoCompleteFreesolo";
import {translator , getSelectedone , baseapi} from "../../Utilities/utilitesFunction"
import DropDownwithselctions from "./DropDownwithselctions";
import Map from "../Map/Map";
import { GiFinishLine } from "react-icons/gi";





export const MultiForm = () => {
  const classes = useStyle();
  const history = useNavigate();
  const theme = useTheme();
  const [cookies, setCookie] = useCookies(['user']);
  const [snakeData, setSnakeData] = useState([false,"",""]);
  
  const [activeStep, setActiveStep] = useState(0);


  const handleNext = (e) => {
    e.preventDefault();

    if(activeStep === 2 && formData["map"] === ""){
      setSnakeData([true, " يجب علي اختيار منطقه العمل او ارفاق صوره", "error"]);
      return;
    }

    setActiveStep((prevActiveStep) => {  return prevActiveStep + 1;   });
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => {    return prevActiveStep - 1;});
  };

  const handleReset = () => {
    setActiveStep(0);
  };



  const attribute= [     
    "", 
  "projectCode", // selectwithapi
  "non", // select
    "non" , // jdshjdhsj
  "non" , // text
  "activityGroupName" , // select
  "non" , // select
  "unit" , // select
  "non" , // insert
  "way" , // freesolo
  "name" , // freesolo
  "name" , // freesolo
  "name" , // freesolo
  "name", // freesolo
];

const maxSteps = attribute.length -1;





  const [ formData , setFormData ] = useState(
    {
      "project":"",
      "siteName":"",
      "map" :"",
      "cabinetSerial":"" ,
      "activityGroupName":"" ,
      "activityType":"" ,
      "measurementUnit":"" ,
      "dayProgress":"" ,
      "deliveryWay":"" ,
      "deliveryTeam":"",
      "siteEngineer":"" ,
      "siteSupervisorMain":"" ,
      "siteSupervisorAssistant":"" ,
    }
  );

  const HandleSubmit = (e) =>{
    e.preventDefault();
    if(activeStep < maxSteps - 1){
      handleNext(e);
      return ;
    }
    let row = new FormData();
    row.append("projectCode", formData["project"]["projectCode"]);
    row.append("siteName", formData["siteName"]);
    row.append("cabinetSerial", formData["cabinetSerial"]);
    row.append("activityID", formData["activityGroupName"]["activityGroupID"]);
    row.append("activityGroup", formData["activityGroupName"]["activityGroupName"]);
    row.append("activityType", formData["activityTypes"]);
    row.append("measurmentUnit", formData["measurementUnit"]["unit"]);
    row.append("dayProgress", formData["dayProgress"]);
    row.append("deliveryWay", formData["deliveryWay"]);
    row.append("deliveryTeam", formData["deliveryTeam"]);
    row.append("siteEngineer", formData["siteEngineer"]);
    row.append("siteSupervisorMain", formData["siteSupervisorMain"]);
    row.append("siteSupervisorAssistant", formData["siteSupervisorAssistant"]);
    row.append("photo", formData["map"]["img"]);
    let seq = formData["map"]["sq"];


    const auth = "Bearer " + cookies.token;
    axios.patch(baseapi+`/projects/${formData["project"]["_id"]}`, { "squares":seq } ,{headers:{authorization: auth,}}).catch((err) =>
    setSnakeData([true, err.response.data.message , "error"]))
    
    axios.post(baseapi+"/rows", row,{headers:{authorization: auth,}})
    .then(res => { 
      setSnakeData([true, "تم ارسال الاستطلاع بنجاح" , "success"]);
      setTimeout(window.location.reload(), 5000);
    } )
    .catch((err) =>
        setSnakeData([true, err.response.data.message , "error"])
    )

  }

  const getapi =["non","/projects","non", "non" ,"non","/activities" ,"non","/measurementUnits","non" ,"/deliveryWays","/deliveryTeams","/siteEngineers","/siteSupervisorMain","/siteSupervisorAssistant"];

  const getformKey = (step) => {
    switch (step){
      case 1: return "project";
      case 2: return "siteName";
      case 3: return "map";
      case 4:  return "cabinetSerial";
      case 5: return "activityGroupName";
      case 6:  return "activityTypes";
      case 7: return "measurementUnit";
      case 8: return "dayProgress";
      case 9: return "deliveryWay";
      case 10:  return "deliveryTeam";
      case 11:  return "siteEngineer";
      case 12: return "siteSupervisorMain";
      case 13: return "siteSupervisorAssistant";
    }
  
  }

  const handleChangeForm = (valuee) => {
    setFormData( (prev) => {
      let p = prev;
      prev[getformKey(activeStep+1)] = valuee;
      return p;});
  }

  const renderStep = (step) => {
    switch (step){
        case 1: {
          return (
            <Grid item container xs={8} md={4} justifyContent="center"   sx={{ bgcolor: theme.palette.primary.main , borderRadius: 2 , marginTop: 2 }}>
              <DropDownwithapi selection={formData[getformKey(step)]} getapi={getapi[step]}  chose={attribute[step]}   setSnakeData={setSnakeData}  key={step} setselection={handleChangeForm} label={" اختر "  + translator(step)} />
            </Grid>
          );}
        
        case 2: {
          return (
            <Grid item container xs={8} md={4} justifyContent="center"   sx={{ bgcolor: theme.palette.primary.main , borderRadius: 2 , marginTop: 2 }}> 
             <DropDownwithselctions selection={formData[getformKey(step)]} selections={formData[getformKey(step-1)]["siteNames"]}   key={step} setselection={handleChangeForm} label={" اختر "  + translator(step)} /> 
            </Grid>
             );}
        
        case 3: {return <Map initsq={formData[getformKey(step-2)]["squares"]} setselection={handleChangeForm} imgurl={baseapi.slice(0,baseapi.length-3)+ "img/projectMaps/" + formData[getformKey(step-2)]["map"]} sd={setSnakeData} />} break;

        case 4:  {
        
          return (
            <Grid item container xs={8} md={6} justifyContent="center"   sx={{ bgcolor: theme.palette.primary.main , borderRadius: 2 , marginTop: 2 }}> 
            <ManualInsert  selection={formData[getformKey(step)]}   key={step} setselection={handleChangeForm} label={" ادخل "  + translator(step)} />
            </Grid>
            );} break;
        
        case 5: {
          
          return (
          <Grid item container xs={8} md={4} justifyContent="center"   sx={{ bgcolor: theme.palette.primary.main , borderRadius: 2 , marginTop: 2 }}>
            <DropDownwithapi selection={formData[getformKey(step)]}  getapi={getapi[step]}  chose={attribute[step]}   setSnakeData={setSnakeData}  key={step} setselection={handleChangeForm} label={" اختر "  + translator(step)} />
          </Grid>
          );}
        
        
        case 6:  {
          
          return (
            <Grid item container xs={8} md={4} justifyContent="center"   sx={{ bgcolor: theme.palette.primary.main , borderRadius: 2 , marginTop: 2 }}>
                <DropDownwithselctions selection={formData[getformKey(step)]} selections={ formData[getformKey(step-1)]["activityTypes"] }   key={step} setselection={handleChangeForm} label={" اختر "  + translator(step)} />
            </Grid>
            );}
        
        
        case 7:  {
          return (
          <Grid item container xs={8} md={4} justifyContent="center"   sx={{ bgcolor: theme.palette.primary.main , borderRadius: 2 , marginTop: 2 }}>
            <DropDownwithapi selection={formData[getformKey(step)]}  getapi={getapi[step]}  chose={attribute[step]}   setSnakeData={setSnakeData}  key={step} setselection={handleChangeForm} label={" اختر "  + translator(step)} />
          </Grid>
          );}
        
        case 8:  {
        
          return (
            <Grid item container xs={8} md={4} justifyContent="center"   sx={{ bgcolor: theme.palette.primary.main , borderRadius: 2 , marginTop: 2 }}>
               <ManualInsert  selection={formData[getformKey(step)]}   key={step} setselection={handleChangeForm} label={" ادخل "  + translator(step)} />
            </Grid> ); } break;
          
        
        case 9:  {
          
          return (
            <Grid item container xs={8} md={4} justifyContent="center"   sx={{ bgcolor: theme.palette.primary.main , borderRadius: 2 , marginTop: 2 }}>
                <AutoCompleteFreesolo selection={formData[getformKey(step)]}  getapi={getapi[step]} chose={attribute[step]} setSnakeData={setSnakeData}  key={step} setselection={handleChangeForm} label={" اختر "  + translator(step)} />
            </Grid>
            );} break;
        
        case 10:  {
          
          return (
            <Grid item container xs={8} md={4} justifyContent="center"   sx={{ bgcolor: theme.palette.primary.main , borderRadius: 2 , marginTop: 2 }}>
                <AutoCompleteFreesolo selection={formData[getformKey(step)]}  getapi={getapi[step]} chose={attribute[step]} setSnakeData={setSnakeData}  key={step} setselection={handleChangeForm} label={" اختر "  + translator(step)} />
            </Grid>
            );} break;
        
        
        case 11:  {
          
          return (
            <Grid item container xs={8} md={4} justifyContent="center"   sx={{ bgcolor: theme.palette.primary.main , borderRadius: 2 , marginTop: 2 }}>
                <AutoCompleteFreesolo  selection={formData[getformKey(step)]} getapi={getapi[step]} chose={attribute[step]} setSnakeData={setSnakeData}  key={step} setselection={handleChangeForm} label={" اختر "  + translator(step)} />
            </Grid>
            );} break;
        
        
        case 12:  {
          
          return (
            <Grid item container xs={8} md={4} justifyContent="center"   sx={{ bgcolor: theme.palette.primary.main , borderRadius: 2 , marginTop: 2 }}>
                <AutoCompleteFreesolo selection={formData[getformKey(step)]}  getapi={getapi[step]} chose={attribute[step]} setSnakeData={setSnakeData}  key={step} setselection={handleChangeForm} label={" اختر "  + translator(step)} />
            </Grid>
            );} break;
        case 13:  {
          
          return (
            <Grid item container xs={8} md={4} justifyContent="center"   sx={{ bgcolor: theme.palette.primary.main , borderRadius: 2 , marginTop: 2 }}>
               <AutoCompleteFreesolo selection={formData[getformKey(step)]}  getapi={getapi[step]} chose={attribute[step]} setSnakeData={setSnakeData}  key={step} setselection={handleChangeForm} label={" اختر "  + translator(step)} />
            </Grid>
            );} break;
        }

  }


return (
  <Grid 
  container 
  alignItems="center"
  justifyContent="center"
  className={classes.SignPage}
  > 
    <Grid item container xs={12} md={6} direction="column"  alignItems="center">
      <form className={classes.Form} onSubmit={HandleSubmit}>
        <Grid item container xs={12} md={12} component={Paper} sx={{marginTop:1}} direction="row" spacing={4} className={classes.SignCard} alignItems="center">
        <Box sx={{ maxWidth: "100%", flexGrow: 1 }}>
      <Grid item xs={12} component={Paper}
        elevation={0}
        sx={{
          verticalAlign:"middle",
          height: 45,
          pl: 2,
          bgcolor: theme.palette.primary.main,
          borderRadius:3,
          paddingTop:1
        }}
        textAlign="center"
      >
        <Typography alignSelf="center" sx={{color: "white"}} variant="h2">{translator(activeStep+1)}</Typography>
      </Grid>
      <Grid
        item 
        container
        alignItems="center"
        justifyContent="center"
        >
                {renderStep(activeStep+1)}
        </Grid>


      <MobileStepper
        variant="progress"
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button
            type="submit"
            size="small"
            endIcon={ (activeStep === maxSteps - 1)  ? <GiFinishLine color="white" /> : ""}
          >
            {(activeStep === maxSteps - 1) ? "Finsh" : "Next"}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === 'rtl' ? (
              < AiFillFileText />
            ) : (
              < AiFillFileText />
            )}
            Back
          </Button>
        }
      />
    </Box>


        </Grid>
      </form>
    </Grid>
    <Snackbar sx={{ width:400, }} open={snakeData[0]} autoHideDuration={3000} onClose={() => setSnakeData([false , "" , ""]) }>
            <Alert onClose={() => setSnakeData([false , "" , ""])} severity={ snakeData[2] === "success" ? "success" : (snakeData[2] == "error" ?"error" :"info")} >
                {snakeData[1]}
            </Alert >
    </Snackbar>
  </Grid>
  );

}

export default MultiForm;