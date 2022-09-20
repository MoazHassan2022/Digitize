import { useTheme } from "@emotion/react";
import {  Button , Grid, TextField, Autocomplete } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { IoRemoveCircle} from "react-icons/io5"


export const Removeafterselect = ({setk,getapi , getlabel , obsenget , sendapi, obsen , label , setSnakeData  }) => {
  const theme = useTheme();
  const [cookies] = useCookies();
  const [allselections , setallselections] = useState([]);
  const [selections , setselections] = useState([]); 
  // for toggle
  const [endprojects , setendprojects] = useState(false);
    //// this for specifc
    const [allspecifcselections , setallspecifcselections] = useState([]);
    const [specifcselections , setspecifcselections] = useState([]); 

  const HandleSubmit = (e) => {
    e.preventDefault();

    let data = specifcselections;
    data = data.sort(
      (a, b) => {
         return a[0][0] - b[0][0] || ((a[0][0] - b[0][0] === 0) &&  b[0][1] - a[0][1] )
      }
    )
    let newdata = allselections;
    const changedprojects = new Set()

    data.map(element =>{
      changedprojects.add(element[0][0]);
      newdata[element[0][0]][obsen].splice(element[0][1], 1);
    })
    setallselections(newdata);

    changedprojects.forEach(element =>{
      deletesel(element)
    })

    //specifcselections.map(m => {deletesel(m);});
  }

  const deletesel = async(el) => {
    const auth = "Bearer " + cookies.token;
    let ob={}; ob[obsen] = allselections[el][obsen];
    await axios.patch(sendapi+`/${allselections[el]["_id"]}`,ob ,{headers:{authorization: auth,}})
    .then(res => { 
        setSnakeData([true, `تم تحديث ${allselections[el][obsenget]} ${label} بنجاح` , "success"]);
        setTimeout(() => window.location.reload(), 3000);
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

const handlefinshchose = () => {
  if(endprojects)
  {
    setk(Math.random() * 640);
    setallspecifcselections([]);
    setspecifcselections([]);
    setselections([]);
  }else{
    if(selections.length === 0){
      setSnakeData([true, ` من فضلك قم باختيار احدي ال ${getlabel}  عل الاقل   ` , "error"]);
      return;
    }
    let sites = [];
    selections.map((m) => {
      let indexm=allselections.indexOf(m);
      m[obsen].map((n,indexn) => {
        sites.push([[indexm,indexn] ,m[obsenget],n])
      })    });

    setallspecifcselections(sites);
}
  setendprojects(!endprojects);
}

useEffect(() => {
    requestAvailabeleSelection();   
    return () => {}
} , [])

    return(
        <Grid item container  xs={10} md={10}>
          <form onSubmit={HandleSubmit}>
            <Grid item container  xs={12} md={12} spacing={3} >
              <Grid item container xs={12} justifyContent="flex-end">
              <Autocomplete
                multiple
                disabled={endprojects}
                options={allselections}
                onChange={(event, newValue) => {
                    setselections(newValue);
                }}
                isOptionEqualToValue={(option, value) => option[obsenget] === value[obsenget]}
                getOptionLabel={(option) => option[obsenget]}
                filterSelectedOptions
                renderInput={(params) => {
                    return (
                    <TextField
                        required={selections.length === 0}
                        {...params}
                      label={"احذف من "+label+"ك"}
                      placeholder="احذف المزيد"
                    />)
                  }}
                sx={{width: '100%', overflow: 'hidden' , marginBottom:2}}
                />
                <Button variant="contained" onClick={handlefinshchose} startIcon={<IoRemoveCircle />}>{endprojects ? " اعد الاختيار" : "انهيت الاختيار"} </Button>
              </Grid>

              <Grid item xs={12} >
              <Autocomplete
                multiple
                disabled={!endprojects}
                options={allspecifcselections}
                onChange={(event, newValue) => {
                  setspecifcselections(newValue);
                }}
                getOptionLabel={(option) => option[2]}
                filterSelectedOptions
                groupBy={(option) =>  option[1]}
                renderInput={(params) => (
                    <TextField
                        required={specifcselections.length === 0}
                        {...params}
                      label={"احذف من "+label+"ك"}
                      placeholder="احذف المزيد"
                    />
                  )}
                sx={{width: '100%', overflow: 'hidden'}}
                />
              </Grid>
             
            
              <Grid item xs={12} style={{textAlign: "end"}}>
                <Button type="submit" variant="contained" startIcon={<IoRemoveCircle />}>احذف </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
    );
}

export default Removeafterselect;


/*




*/