import { useCookies } from "react-cookie";
import UnAuth from "../../Pages/UnAuth/UnAuth";

const AdminAuthWrapper = ({ children }) => {
  const [cookies, removeCookie] = useCookies(['user']);


  if ( !cookies.token || cookies.token === "undefined" || cookies.token === "" || cookies.userType === "0") {
    removeCookie("token");
    removeCookie("email");
    removeCookie("name");
    removeCookie("userType");
    removeCookie("id");
    return <UnAuth />;
  }

  return <>{children}</>;
};

export default AdminAuthWrapper;