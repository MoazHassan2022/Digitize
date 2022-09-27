import { useTheme } from "@emotion/react";
import { Autocomplete, createFilterOptions, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import {baseapi} from "../../Utilities/utilitesFunction"


const filter = createFilterOptions();


export const AutoCompleteFreesolo = ({setselection, chose ,getapi , label, setSnakeData}) => {
  const theme = useTheme();
  const [ss , setss] = useState(null);
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
      }).catch((err) => {
        setSnakeData([true, err.response.data.message , "error"]);
      });
}


useEffect(() => {
  requestAvailabeleSelection();   
  return () => {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
    } , [])


    return(
      <Autocomplete
      value={ss}
      required
      onChange={(event, newValue) => {
        if (typeof newValue === 'string') {
          setselection(newValue[chose])
          setss(newValue)
        } else if (newValue && newValue.inputValue) {
          let ob = {}; ob[chose] = newValue.inputValue;
          setss(ob);
          setselection(newValue[chose]);
        } else {
          setselection(newValue[chose]);
          setss(newValue);
        }
      }}

      filterOptions={(options, params) => {
        const filtered = filter(options, params);
        const { inputValue } = params;
        // Suggest the creation of a new value
        const isExisting = options.some((option) => inputValue === option.title);
        if (inputValue !== '' && !isExisting) {
          let ob ={inputValue}; ob[chose] =`${inputValue}`;
          filtered.push(ob);
        }
        return filtered;
      }}
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      options={selections}
      getOptionLabel={(option) => {
        if (typeof option === 'string') {
          return option;
        }
        if (option.inputValue) {
          return option.inputValue;
        }
        return option[chose];
      }}
      renderOption={(props, option) => <li {...props}>{option[chose]}</li>}
      sx={{ width: 300 }}
      renderInput={(params) => (
        <TextField {...params} required sx={{bgcolor:"white"}} label={label} />
      )}
    />

    );
}
export default AutoCompleteFreesolo;