import {
  HashRouter as Router,
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
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { signOut } from "firebase/auth";

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
            // console.log('TOKEN', token)
            sessionStorage.setItem("auth_token", encryptData(token, import.meta.env.VITE_SALT))
            setAuthToken(token)
          })
          .catch((e) => {
            // potential need to signOut here if we want to clear session storage and handle error
            sessionStorage.clear() 
            signOut(auth);
            console.error(e)
          })
      } else {
        sessionStorage.clear()
      }
    });
  },[])

  return (
    <AuthContext.Provider value={authToken}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Root/>
        </Router>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      </QueryClientProvider>
    </AuthContext.Provider>
  )
}

export default App
