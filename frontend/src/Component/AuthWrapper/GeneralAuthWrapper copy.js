import { useCookies } from "react-cookie";
import UnAuth from "../../Pages/UnAuth/UnAuth";

const GeneralAuthWrapper = ({ children }) => {
  const [cookies] = useCookies(['user']);


  if (!cookies.token || cookies.token === "undefined" || cookies.token === "") {
    return <UnAuth />;
  }

  return <>{children}</>;
};

export default GeneralAuthWrapper;