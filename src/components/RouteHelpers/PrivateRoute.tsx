import { useAuthContext } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";
import { useGetUser } from "../../api/user";

type Props = {
    children: JSX.Element
}

const PrivateRoute = ({children} : Props) => {
    const authToken = useAuthContext();
    const {data: resUser, isLoading} = useGetUser();

    if (!isLoading && resUser) {
        if (authToken && resUser.onboarded){
            return children
        }
        else if (authToken && !resUser.onboarded){
            return <Navigate to='/onboarding'/>
        }
        return (<Navigate to='/login'/>);
    }
    return <></>
}
 
export default PrivateRoute;