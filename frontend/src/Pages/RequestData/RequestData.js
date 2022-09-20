import useStyle from "./RequestDataStyles";
import {  useCookies } from "react-cookie";
import Header from "../../Component/Header/Header";
import RequestDataForm from "../../Component/RequestDataForm/RequestDataForm";

export const RequestData = () => {
  const classes = useStyle();
  const [cookies, setCookie] = useCookies(['user']);


    return (
        <>
        <Header />
        <RequestDataForm />
        </>
        )

}

export default RequestData;