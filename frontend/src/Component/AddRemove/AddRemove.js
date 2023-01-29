
import { Alert,  Grid, IconButton, Paper, Snackbar , Typography } from "@mui/material";
import { useState } from "react";
import useStyle from "./AddRemoveStyles";
import { FcAddRow , FcDeleteRow } from "react-icons/fc";
import {baseapi} from "../../Utilities/utilitesFunction";
import AddwithoutSelction from "./SettingTools/AddwithoutSelction";
import Removefromselection from "./SettingTools/Removefromselection";
import Addwithselections from "./SettingTools/Addwithselections";
import Removeafterselect from "./SettingTools/Removeafterselect";
import AddProject from "./SettingTools/AddProject";
import ChangeProjectImg from "./SettingTools/ChangeProjectImg";
import Addwith2Input from "./SettingTools/Addwith2Input";


export const AddRemove = ({textonly, obsenget ,getlabel , getApi  , setApi, obcal , label}) => {
    const [snakeData, setSnakeData] = useState([false,"",""]);
    const classes = useStyle();
    const Apiget = baseapi + getApi;
    const Apiset = baseapi + setApi;

    const [isAdd , setIsAdd] = useState(true);
    const [resetKey , setresetKey] = useState(Math.random() * 5000);


    const renderSetting = () => {

        if(isAdd && label ==="مشاريع") return <AddProject  sendapi={Apiset} obsen={obcal} label={label} setSnakeData={setSnakeData} />
        if(label === "عدل صور خرائط") return <ChangeProjectImg  setSnakeData={setSnakeData} />
        if(isAdd && label === "مجموعات نشاط") return <Addwith2Input sendapi={Apiset} obsen={obcal} label={label} setSnakeData={setSnakeData} />

        if(!isAdd) return textonly ? <Removefromselection getapi={Apiget} sendapi={Apiset} obsen={obcal} label={label} setSnakeData={setSnakeData} /> :
        <Removeafterselect key={resetKey} obsenget={obsenget} setk={setresetKey} getlabel={getlabel} getapi={Apiget} sendapi={Apiset} obsen={obcal} label={label} setSnakeData={setSnakeData} />
        return textonly ? <AddwithoutSelction  sendapi={Apiset} obsen={obcal} label={label} setSnakeData={setSnakeData} /> :
        <Addwithselections obsenget={obsenget} getlabel={getlabel} getapi={Apiget} sendapi={Apiset} obsen={obcal} label={label} setSnakeData={setSnakeData} />
    }

    return (
        <Grid 
        container 
        alignItems="center"
        justifyContent="center"
        className={classes.SignPage}
        > 
    <Grid item container xs={12} md={5} direction="column"  alignItems="center" >
        <Grid item container  xs={12} md={12} component={Paper}  sx={{ borderBottomRightRadius:50, width:"100%" ,paddingBottom:2 }} className={classes.SignCard} alignItems="center">
            <Grid item  container 
            xs={12}
            className={classes.Paper}
            sx={{ marginTop:2, marginBottom:4, marginX:2 , paddingX:1, width:"100%" }}
            >
                <Grid item container xs={2} >
                    {(label !== "عدل صور خرائط") && 
                <IconButton onClick={()=>setIsAdd(!isAdd)} >
                    {isAdd ? <FcAddRow title="Add item" /> : <FcDeleteRow title="remove item" />}
                </IconButton>
                }
                </Grid>
                <Grid item container xs={10} justifyContent="flex-end" >
                    {(label !== "عدل صور خرائط") ?
                <Typography component={'span'} sx={{color: "white" , fontSize:"1.3rem"}}  variant="h2" > {isAdd ? " اضف الي "  :"احذف من   "} {label}ك</Typography>
                :
                <Typography component={'span'} sx={{color: "white" , fontSize:"1.3rem"}}  variant="h2" >عدل صور خرائطك</Typography>
            }
                </Grid>
            </Grid>

            <Grid item container xs={12} justifyContent="center" alignItems="center" >
            {renderSetting()}
            </Grid>

        </Grid>
    </Grid>
    <Snackbar sx={{ width:400, }} open={snakeData[0]} autoHideDuration={3000} onClose={() => setSnakeData([false , "" , ""]) }>
            <Alert onClose={() => setSnakeData([false , "" , ""])} severity={ snakeData[2] === "success" ? "success" : (snakeData[2] === "error" ?"error" :"info")} >
                {snakeData[1]}
            </Alert >
    </Snackbar>
  </Grid>
  );
}
export default AddRemove;
