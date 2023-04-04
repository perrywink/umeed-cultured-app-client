import {
  BrowserRouter as Router,
} from "react-router-dom";
import { auth } from "./config/firebase";
import { useEffect, useState } from "react";
import AuthContext from "./context/AuthContext";
import Root from "./pages/Root";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import {authVerify} from "./utils/authVerify"
import { encryptData } from "./utils/crypto";


function App() {
  const [authToken, setAuthToken] = useState<string | null>(
    sessionStorage.getItem("auth_token")
  );
  const queryClient = new QueryClient()

  authVerify()

  useEffect(() => {
    return auth.onAuthStateChanged(async (user) => {
      if (user){
        sessionStorage.setItem("user", user.email?encryptData(user.email,import.meta.env.VITE_SALT):"");
        sessionStorage.setItem("auth_token", user?.refreshToken)
        user ? setAuthToken(user.refreshToken) : setAuthToken(null)
      }

    });
  },[])

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContext.Provider value={authToken}>
        <Router>
          <Root/>
        </Router>
      </AuthContext.Provider>
    </QueryClientProvider>
  )
}

export default App
