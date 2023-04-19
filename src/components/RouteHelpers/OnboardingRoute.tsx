import { useAuthContext } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";

type Props = {
    children: JSX.Element
}

const OnboardingRoute = ({children} : Props) => {
    const authToken = useAuthContext();
    return (authToken ? children : <Navigate to='/login'/>);
}
 
export default OnboardingRoute;