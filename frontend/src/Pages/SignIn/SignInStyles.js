import { makeStyles } from "@mui/styles";
import theme from "../../Utilities/Theme";
import Backfoundimg from "./BackGound.jpeg"
import RightImg from "./Right.jpg"

const useStyle = makeStyles({
    BackGound:{
    minHeight: "100vh",
    backgroundImage: `url(${Backfoundimg})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    },
    Right:{
        minHeight:"100%",
        backgroundImage: `url(${RightImg})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        borderRadius:"1.3rem",
    },
    Left:{
        height:"80vh",
    }
});
  
  export default useStyle;
  