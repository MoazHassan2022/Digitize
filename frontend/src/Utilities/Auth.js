import { useNavigate } from "react-router-dom";


export const IsAuth = (cookies) => {
    const history = useNavigate();
    if(cookies.token.length < 10) history("/")
}

export default {IsAuth};