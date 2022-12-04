import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import {baseapi} from "../../Utilities/utilitesFunction"

export const DropDownwithapi = ({disNext ,setselection, chose ,getapi , label, setSnakeData }) => {

  const [ss , setss] = useState("");
  const [loading , setloading] = useState(true);
  
  const [selections , setselections] = useState([]);
  const [cookies] = useCookies(['user']);

  const requestAvailabeleSelection =  () => {
    const auth = "Bearer " + cookies.token;
     axios.get(baseapi+getapi ,
      {headers:{
        authorization: auth,
      }}
      ).then(response =>{
        setselections(response.data.data.data);
        setloading(false);
        disNext(false);
      }).catch((err) => {
        setSnakeData([true, err.response.data.message , "error"]);
      });
  }

useEffect(() => {
  disNext(true);
  requestAvailabeleSelection();
  return () => {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  } , [])

    return(
      <FormControl sx={{ m: 1, minWidth: "80%" , backgroundColor:"white" , borderRadius:2, }} size="large">
        <InputLabel id="demo-simple-select-label">{!loading ? label : "loading......"}</InputLabel>
        <Select
        value={ss}
        required
        onChange={(e) => {setselection(e.target.value); setss(e.target.value)}}
        label={ !loading ? label : "loading......"}
        disabled={loading}
        >
                {selections.map((item,index) => <MenuItem key={index} value={item}>{item[chose]}</MenuItem>) }
        </Select>
      </FormControl> 
    );
}
export default DropDownwithapi;

