import { useAuthContext } from "../../context/AuthContext";
import { useUserContext } from "../../context/UserContext";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useGetUser } from "../../api/user";

type Props = {
    children: JSX.Element
}

const PrivateRoute = ({children} : Props) => {
    const authToken = useAuthContext();
    const {user} = useUserContext();
    console.log('ONBOARD', user?.onboarded)

    if (authToken && user?.onboarded)
        return children
    else if (authToken)
        return <Navigate to='/onboarding'/>
    return (<Navigate to='/login'/>);
}
 
export default PrivateRoute;