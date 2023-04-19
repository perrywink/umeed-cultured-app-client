import { createContext, useContext, useState } from "react";
import { PGUser } from '../types/User'

interface IUserContext {
    user: PGUser | null,
    setUser: React.Dispatch<React.SetStateAction<PGUser | null>>
}

const UserContext = createContext<IUserContext>({
    user: null,
    setUser: () => {}
})

export function useUserContext() {
    return useContext(UserContext);
}

export function UserProvider({ children }: {children: JSX.Element}) {
    const [user, setUser] = useState<PGUser | null>(null)
    
    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContext;