import useStyle from "./SubmitSurvyStyles";
import {  useCookies } from "react-cookie";
import Header from "../../Component/Header/Header";
import MultiForm from "../../Component/MultiStepForm/MultiForm";

export const SubmitSurvy = () => {
  const classes = useStyle();
  const [cookies, setCookie] = useCookies(['user']);


    return (
        <>
        <Header />
        <MultiForm />
        </>
        )

}

export default SubmitSurvy;