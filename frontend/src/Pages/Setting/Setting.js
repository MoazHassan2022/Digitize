import useStyle from "./SettingStyles";
import {  useCookies } from "react-cookie";
import Header from "../../Component/Header/Header";
import SettingTabs from "../../Component/SettingTabs/SettingTabs";

export const Setting = () => {
  const classes = useStyle();
  const [cookies, setCookie] = useCookies(['user']);

    return (
        <>
        <Header />
        <SettingTabs />
        </>
        )

}

export default Setting;