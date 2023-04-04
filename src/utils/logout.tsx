import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";
import { Navigate } from "react-router-dom";

export const logout = () => {
    signOut(auth)
    localStorage.removeItem("token")
    sessionStorage.clear()
    return(
        <Navigate to='/login'/>
    )
}