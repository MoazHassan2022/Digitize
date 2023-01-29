import { makeStyles } from "@mui/styles";
import theme from "../../Utilities/Theme";

const useStyle = makeStyles({
    SignPage: {
      minHeight: "80vh",
    },
    logo: {
    },
    SignCard: {
      boxSizing: "border-box",
      borderRight: `4px solid ${theme.palette.primary.main}`,
      borderBottom: `4px solid ${theme.palette.primary.main}`,
    },
    Form:{
      width: "100%",
    },
    Paper:{
      backgroundColor: theme.palette.primary.main,
      borderRadius: 14,
      padding:0,
      marginLeft:10,
      height: 37,
      
    }


  });
  
  export default useStyle;
  