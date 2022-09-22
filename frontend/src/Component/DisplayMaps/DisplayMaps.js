import { useTheme } from "@emotion/react";
import { Alert, Grid, Snackbar, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { baseapi } from "../../Utilities/utilitesFunction";
import MapImg from "../Map/Img/Img";


export const DisplayMaps =()=> {

  const [allselections , setallselections] = useState([]);
  const [cookies] = useCookies();
  const theme = useTheme();
  const [snakeData, setSnakeData] = useState([false,"",""]);


    
    const requestAvailabeleSelection =  () => {
        const auth = "Bearer " + cookies.token;
         axios.get(baseapi + "/projects" ,
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
        requestAvailabeleSelection();   
        return () => {}
      } , [])
      
    return(
        <Grid container xs={12} md={12} justifyContent="center" >
            {allselections.map( (pro, index) =>
             (pro["map"] != undefined) &&
             <Grid key={index} item xs={12} md={10} margin={2} textAlign="center" > 
             <Typography sx={{bgcolor: theme.palette.primary.main , borderTopLeftRadius:30,borderTopRightRadius:30, }} color="white" fontSize={24} >{pro["projectCode"]}</Typography>
                <MapImg key={index} keyy={index} squares={pro.squares}  curs={[-1,-1]}  imgurl={baseapi.slice(0,baseapi.length-3)+ "img/projectMaps/" + (pro["map"])} />
            </Grid>
            )}
            
            <Snackbar sx={{ width:400, }} open={snakeData[0]} autoHideDuration={3000} onClose={() => setSnakeData([false , "" , ""]) }>
            <Alert onClose={() => setSnakeData([false , "" , ""])} severity={ snakeData[2] === "success" ? "success" : (snakeData[2] == "error" ?"error" :"info")} >
                {snakeData[1]}
            </Alert >
            </Snackbar>
        </Grid>
    );
}
export default DisplayMaps;