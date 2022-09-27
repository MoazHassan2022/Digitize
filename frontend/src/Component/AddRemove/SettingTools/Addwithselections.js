import {  Autocomplete, Button,  Grid, TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import {IoAddCircle} from "react-icons/io5"
import Addwithtags from "../../Addwithtages/Addwithtags";


export const Addwithselections = ({ getapi , getlabel , obsenget , sendapi, obsen , label , setSnakeData  }) => {
  const [cookies] = useCookies();
  const [enterditems , setenterditems] = useState("");
  const [allselections , setallselections] = useState([]);
  const [selections , setselections] = useState([]); 

  const validation = () =>
  {
      if(selections === []) {setSnakeData([true, "من فضلك اختر عنصرا عل الاقل" , "error"]); return false;}
      if(enterditems.length === 0) {setSnakeData([true, "من فضلك ادخل احد العناصر عل الاقل " , "error"]); return false;}
      return true;
  }
  
  const HandleSubmit = async (e) => {
    e.preventDefault();
    if(!validation()) return;

    let data = selections[obsen];
    data = data.concat(enterditems);
    let ob={}; ob[obsen] = data;

    const auth = "Bearer " + cookies.token;
    await axios.patch(sendapi+`/${selections["_id"]}`, ob,{headers:{authorization: auth,}})
    .then(res => {
        setSnakeData([true, " تمت الاضافة بنجاح" , "success"]);
    } )
    .catch((err) =>{
        setSnakeData([true, err.response.data.message , "error"])
      });    

   
  }


  const requestAvailabeleSelection =  () => {
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

function handleSelecetedTags(items) {
  setenterditems(items)
}

  
useEffect(() => {
  requestAvailabeleSelection();  
  return () => {}
      // eslint-disable-next-line react-hooks/exhaustive-deps
} , [])

    return(
        <Grid item container  xs={10} md={10}>
            <Grid item container  xs={12} md={12} spacing={3} >
              <Grid item xs={12}>
              <Autocomplete
                options={allselections}
                onChange={(event, newValue) => {
                    setselections(newValue);
                }}
                getOptionLabel={(option) => option[obsenget]}
                filterSelectedOptions
                renderInput={(params) => (
                    <TextField
                        required={selections.length === 0}
                        {...params}
                      label={"اختر  من "+getlabel+"ك"}
                      placeholder="احذف المزيد"
                    />
                  )}
                />
              </Grid>
              
              
              <Grid item xs={12} >
                  
              <Addwithtags
                selectedTags={handleSelecetedTags}
                variant="outlined"
                fullWidth
                sx={{maxWidth: 530,}}
                placeholder={`اضف ${label}`}
                label={`اضف ${label}`}
                />

              </Grid>
            
              <Grid item xs={12} style={{textAlign: "end"}}>
                <Button onClick={HandleSubmit} variant="contained" startIcon={<IoAddCircle />}>اضف</Button>
              </Grid>
            </Grid>
        </Grid>
    );
}
export default Addwithselections;