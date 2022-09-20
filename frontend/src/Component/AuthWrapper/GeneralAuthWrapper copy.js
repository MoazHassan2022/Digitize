import { useCookies } from "react-cookie";
import UnAuth from "../../Pages/UnAuth/UnAuth";

const GeneralAuthWrapper = ({ children }) => {
  const [cookies, setCookie] = useCookies(['user']);


  if (cookies.token === undefined || cookies.token === "") {
    return <UnAuth />;
  }

  return <>{children}</>;
};

export default GeneralAuthWrapper;