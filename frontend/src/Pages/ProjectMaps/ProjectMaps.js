import useStyle from "./ProjectMapsStyles";
import {  useCookies } from "react-cookie";
import Header from "../../Component/Header/Header";
import DisplayMaps from "../../Component/DisplayMaps/DisplayMaps";

export const ProjectMaps = () => {
  const classes = useStyle();
  const [cookies, setCookie] = useCookies(['user']);


    return (
        <>
        <Header />
        <DisplayMaps />
        </>
        )

}

export default ProjectMaps;