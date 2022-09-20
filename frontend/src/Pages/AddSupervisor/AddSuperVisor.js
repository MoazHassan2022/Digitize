import useStyle from "./AddSuperVisorStyles";
import {  useCookies } from "react-cookie";
import Header from "../../Component/Header/Header";
import AddSuperVisorForm from "../../Component/AddSuperVisorForm/AddSuperVisorForm";


export const AddSuperVisor = () => {
  const classes = useStyle();
  const [cookies, setCookie] = useCookies(['user']);

    return (
        <>
        <Header />
        <AddSuperVisorForm />
        </>
        )

}

export default AddSuperVisor;