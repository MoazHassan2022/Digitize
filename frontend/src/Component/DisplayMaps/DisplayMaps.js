import { useTheme } from "@emotion/react";
import { Alert,  Grid, Snackbar, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { baseapi, mediaApi } from "../../Utilities/utilitesFunction";
import MapImg from "../Map/Img/Img";
import Spinner from "../Spinner/Spinner";


export const DisplayMaps =()=> {

  const [allselections , setallselections] = useState([]);
  const [cookies] = useCookies();
  const theme = useTheme();
  const [snakeData, setSnakeData] = useState([false,"",""]);
  const [isFetching, setIsFetching] = useState(true); 
    
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
        setTimeout(function () {
          setIsFetching(false); 
        }, 5000);
      // eslint-disable-next-line react-hooks/exhaustive-deps
      } , [])


      if (isFetching) {
        return (
          <Grid item container sx={{ minHeight:"80vh"}}  
          alignItems="center"
          justifyContent="center"
          >
            <Grid item xs={12} md={12}  justifyContent="center" textAlign="center">
              <Spinner />
            </Grid>
          </Grid>
        );
      }
      
    return(
        <Grid container  justifyContent="center" >
            {allselections.map( (pro, index) =>
             (pro["map"] !== undefined) &&
             <Grid key={index} item xs={12} md={10} margin={2} textAlign="center" > 
             <Typography sx={{bgcolor: theme.palette.primary.main , borderTopLeftRadius:30,borderTopRightRadius:30, }} color="white" fontSize={24} >{pro["projectCode"]}</Typography>
                <MapImg key={index} keyy={index} squares={pro.squares}  curs={[-1,-1]}  imgurl={mediaApi + "/img/projectMaps/" + (pro["map"])} />
            </Grid>
            )}
            
            <Snackbar sx={{ width:400, }} open={snakeData[0]} autoHideDuration={3000} onClose={() => setSnakeData([false , "" , ""]) }>
            <Alert onClose={() => setSnakeData([false , "" , ""])} severity={ snakeData[2] === "success" ? "success" : (snakeData[2] === "error" ?"error" :"info")} >
                {snakeData[1]}
            </Alert >
            </Snackbar>
        </Grid>
    );
}
export default DisplayMaps;