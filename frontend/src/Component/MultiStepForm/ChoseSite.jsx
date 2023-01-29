import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import {baseapi} from "../../Utilities/utilitesFunction"

export const ChoseSite = ({disNext ,setselection, chose ,getapi , label, setSnakeData }) => {
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
        value={ss ?? ""}
        required
        onChange={(e) => {
          let vals=e.target.value.split(" ");
          setselection({ "projectCode" : selections[parseInt(vals[0])]["projectCode"] ,
                          "siteName" : selections[parseInt(vals[0])]["siteNames"][parseInt(vals[1])],
                          "squares" : selections[parseInt(vals[0])]["squares"] ,
                          "_id": selections[parseInt(vals[0])]["_id"] , 
                          "map": selections[parseInt(vals[0])]["map"]
                        } );
          setss(e.target.value)}}
        label={ !loading ? label : "loading......"}
        disabled={loading}
        >
                {selections.map((item,index) => item["siteNames"].map((siteName,jndex) => <MenuItem key={Math.random()*500} value={index+ " " + jndex}>{siteName}</MenuItem>))}
        </Select>
      </FormControl> 
    );
}
export default ChoseSite;

