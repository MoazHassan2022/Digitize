import { makeStyles } from "@mui/styles";
import theme from "../../Utilities/Theme";
import BackG from "./assests/background.jpg";

const useStyle = makeStyles({
  SignPage: {
    minHeight: "70rem",
    paddingTop: "6rem",
    background: "rgb(5,16,168)",
    background:
      "linear-gradient(209deg, rgba(5,16,168,1) 0%, rgba(176,176,201,1) 0%, rgba(225,227,246,1) 24%, rgba(0,15,41,1) 76%)",
  },
  logo: {
    maxWidth: "3.5rem",
    margin: "auto",
  },
  logoImg: {
    width: "auto",
    height: "auto",
    transform: "scale(.4)",
  },
  SignCard: {
    maxWidth: "30rem",
    // borderRight: `4px solid ${theme.palette.primary.main}`,
    // borderBottom: `4px solid ${theme.palette.primary.main}`,
  },
  textField: {
    width: 300,
  },
  Form: {
    width: "100%",
  },
  Tracker: {
    borderRadius: "2rem",
    backgroundColor: "white",
  },
  TrackerLabel: {
    height: 75,
    fontSize: "2.2rem",
    backgroundColor: theme.palette.primary.main,
    borderTopLeftRadius: "1rem",
    borderTopRightRadius: "1rem",
  },
  FormContainer: {
    height: "100vh",
    maxHeight: "70vh",
  },
  StepsContainer: {
    backgroundColor: "white",
    borderRadius: "2rem",
    backgroundImage: `url(${BackG})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
});

export default useStyle;
