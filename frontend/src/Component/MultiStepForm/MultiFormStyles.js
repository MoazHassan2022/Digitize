import { makeStyles } from "@mui/styles";
import theme from "../../Utilities/Theme";

const useStyle = makeStyles({
    SignPage: {
      minHeight: "80vh",
      padding: "2%",
    },
    logo: {
      maxWidth: "3.5rem",
      margin: "auto",
    },
    logoImg:{
      width: "auto", 
      height: "auto", 
      transform:"scale(.4)"
    },
    SignCard: {
      maxWidth: "30rem",
      height: "fit-content",
      boxSizing: "border-box",
      borderRight: `4px solid ${theme.palette.primary.main}`,
      borderBottom: `4px solid ${theme.palette.primary.main}`,
      padding: "1.5rem",
    },
    textField:{
      width:300
    }, 
    Form:{
      width: "100%",
      marginLeft: 7,
    }

  });
  
  export default useStyle;
  