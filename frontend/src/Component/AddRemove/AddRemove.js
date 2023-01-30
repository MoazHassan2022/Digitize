
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


export const AddRemove = ({textonly, obsenget ,getlabel , getApi  , setApi, obcal , label, isAdd}) => {
    const [snakeData, setSnakeData] = useState([false,"",""]);
    const classes = useStyle();
    const Apiget = baseapi + getApi;
    const Apiset = baseapi + setApi;

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
        <>
            {renderSetting()}
    <Snackbar sx={{ width:400, }} open={snakeData[0]} autoHideDuration={3000} onClose={() => setSnakeData([false , "" , ""]) }>
            <Alert onClose={() => setSnakeData([false , "" , ""])} severity={ snakeData[2] === "success" ? "success" : (snakeData[2] === "error" ?"error" :"info")} >
                {snakeData[1]}
            </Alert >
    </Snackbar>
    </>
  );
}
export default AddRemove;
