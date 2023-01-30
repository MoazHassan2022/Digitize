import { makeStyles } from "@mui/styles";
import theme from "../../Utilities/Theme";
import BackG from "./assests/background.jpg"


const useStyle = makeStyles({
    SignPage: {
      minHeight: "70rem",
      paddingTop:"6rem",
      background: "rgb(5,16,168)",
      background: "linear-gradient(209deg, rgba(5,16,168,1) 0%, rgba(176,176,201,1) 0%, rgba(225,227,246,1) 24%, rgba(0,15,41,1) 76%)" 
    },

    FormContainer:{
      height:"100vh",
      maxHeight:"70vh",
    },
    StepsContainer:{
      borderRadius:"2rem" ,
      backgroundImage: `url(${BackG})`,
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
    }


  });
  
  export default useStyle;
  