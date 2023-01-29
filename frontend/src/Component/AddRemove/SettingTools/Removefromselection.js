import {  Button , Grid, TextField, Autocomplete } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { IoRemoveCircle} from "react-icons/io5"


export const Removefromselection = ({getapi  , sendapi, obsen , label , setSnakeData  }) => {
  const [cookies] = useCookies();
  const [allselections , setallselections] = useState([]);
  const [selections , setselections] = useState([]); 


  const HandleSubmit = (e) => {
    e.preventDefault();
    if(selections.length === 0){
      setSnakeData([true, "من فضلك اختر واحدة عل الاقل", "error"]);
      return;
    }

    selections.map(m => deletesel(m));
  }

  const deletesel = async(pro) => {
    const auth = "Bearer " + cookies.token;
    await axios.delete(sendapi+`/${pro["_id"]}`,{headers:{authorization: auth,}})
    .then(res => { 
        setSnakeData([true, `تم الالغاء بنجاح` , "success"]);
    } )
    .catch((err) =>{
        setSnakeData([true, err.response.data.message , "error"])
      });
  }

  const requestAvailabeleSites =  () => {
    const auth = "Bearer " + cookies.token;
     axios.get(getapi ,
      {headers:{
        authorization: auth,
      }}
      ).then(response =>{
        setallselections(response.data.data.data);
      }).catch((err) => {
        setSnakeData([true, err.response.data.message , "error"]);
      });
}


useEffect(() => {
    requestAvailabeleSites();   
    return () => {}
      // eslint-disable-next-line react-hooks/exhaustive-deps
    } , [])

    return(
        <Grid item container  xs={10} md={10}>
            <Grid item container  xs={12} md={12} spacing={3} >
              <Grid item xs={12} >
              <Autocomplete
                multiple
                options={allselections}
                onChange={(event, newValue) => {
                    setselections(newValue);
                }}
                isOptionEqualToValue={(option, value) => option[obsen] === value[obsen]}
                getOptionLabel={(option) => option[obsen]}
                filterSelectedOptions
                renderInput={(params) => (
                    <TextField
                        required={selections.length === 0}
                        {...params}
                      label={"احذف من "+label+"ك"}
                      placeholder="احذف المزيد"
                    />
                  )}
                sx={{width: '100%', overflow: 'hidden'}}
                />
              </Grid>
            
              <Grid item xs={12} style={{textAlign: "end"}}>
                <Button onClick={HandleSubmit} variant="contained" startIcon={<IoRemoveCircle />}>احذف </Button>
              </Grid>
            </Grid>
        </Grid>
    );
}

export default Removefromselection;