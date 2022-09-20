import { useTheme } from "@emotion/react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useState } from "react";

export const DropDownwithselctions = ({selection, setselection, chose, selections, label}) => {
  const theme = useTheme();
  let init = selection != undefined ? selection : "";
  const [ss , setss] = useState(init);
    return(
      <FormControl sx={{ m: 1, minWidth: 200 , backgroundColor:"white" , borderRadius:2, }} size="large">
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select
        value={ss}
        required
        onChange={(e) => {setselection(e.target.value); setss(e.target.value)}}
        label={label}
        >
                {selections.map((item,index) => <MenuItem key={index} value={item}>{item}</MenuItem>) }
        </Select>
      </FormControl> 
    );
}
export default DropDownwithselctions;

