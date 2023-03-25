import { createContext, useContext } from "react";
import { User } from "firebase/auth";

const UserContext = createContext<string | null>(null)

export function useUserContext() {
    return useContext(UserContext);
}

export default UserContext;