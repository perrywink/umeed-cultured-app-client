import {decryptData} from "./crypto"
import { logout } from "./logout";


export const authVerify = () => {
    
    if (!sessionStorage.getItem('user') || !localStorage.getItem('token')){
        return false
    }

    const token = decryptData(localStorage.getItem('token'),import.meta.env.VITE_SALT)

    const decodedJWT = JSON.parse(atob(token.split('.')[1])) // need to check why buffer not working and replace atob

    if (decodedJWT.exp * 1000 < Date.now()) {

        logout();
        return false
    }

  
    return true;
}
