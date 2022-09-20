import { useTheme } from "@emotion/react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Cookies, useCookies } from "react-cookie";
import {baseapi} from "../../Utilities/utilitesFunction"

export const DropDownwithapi = ({setselection, chose ,getapi , label, setSnakeData }) => {
  const theme = useTheme();
  const [ss , setss] = useState("");
  const [selections , setselections] = useState([]);
  const [cookies, setCookie] = useCookies(['user']);

  const requestAvailabeleSelection =  () => {
    const auth = "Bearer " + cookies.token;
     axios.get(baseapi+getapi ,
      {headers:{
        authorization: auth,
      }}
      ).then(response =>{
        setselections(response.data.data.data);
      }).catch((err) => {
        setSnakeData([true, err.response.data.message , "error"]);
      });
  }

useEffect(() => {
  requestAvailabeleSelection();   
  return () => {}
} , [])

    return(
      <FormControl sx={{ m: 1, minWidth: "80%" , backgroundColor:"white" , borderRadius:2, }} size="large">
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select
        value={ss}
        required
        onChange={(e) => {setselection(e.target.value); setss(e.target.value)}}
        label={label}
        >
                {selections.map((item,index) => <MenuItem key={index} value={item}>{item[chose]}</MenuItem>) }
        </Select>
      </FormControl> 
    );
}
export default DropDownwithapi;

