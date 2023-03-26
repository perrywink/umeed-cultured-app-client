import { ReactNode } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { Navigate, Route } from "react-router-dom";

type Props = {
    children: JSX.Element
}

const PrivateRoute = ({children} : Props) => {
    const authToken = useAuthContext();
    return (authToken ? children : <Navigate to='/login'/>);
}
 
export default PrivateRoute;