import { makeStyles } from "@mui/styles";
import BackG from "./assests/background.jpg";

const useStyle = makeStyles({
  SignPage: {
    minHeight: "70rem",
    paddingTop: "6rem",
    background: "rgb(5,16,168)",
    background:
      "linear-gradient(209deg, rgba(5,16,168,1) 0%, rgba(176,176,201,1) 0%, rgba(225,227,246,1) 24%, rgba(0,15,41,1) 76%)",
  },

  FormContainer: {
    maxHeight: "auto",
  },
  StepsContainer: {
    borderRadius: "2rem",
    backgroundImage: `url(${BackG})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
  ChildContainer: {
    marginTop: 50,
    marginBottom: 50,
  },
});

export default useStyle;
