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
} from '@tanstack/react-query';
import { encryptData } from "./utils/crypto";

function App() {
  const [authToken, setAuthToken] = useState<string | null>(
    sessionStorage.getItem("auth_token")
  );
  const queryClient = new QueryClient()

  useEffect(() => {
    return auth.onAuthStateChanged(async (userCred) => {
      if (userCred){
        userCred.getIdToken()
          .then((token) => {
            sessionStorage.setItem("auth_token", encryptData(token, import.meta.env.VITE_SALT))
            setAuthToken(token)
          })
          .catch((e) => {
            setAuthToken(null)
            console.error(e)
          })
      } else {
        setAuthToken(null)
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
