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

function App() {
  const [authToken, setAuthToken] = useState<string | null>(
    sessionStorage.getItem("auth_token")
  );
  const queryClient = new QueryClient()

  useEffect(() => {
    return auth.onAuthStateChanged(async (userCred) => {
      if (userCred){
        userCred.getIdToken(true)
          .then((token) => {
            // console.log('TOKEN', token)
            sessionStorage.setItem("auth_token", encryptData(token, import.meta.env.VITE_SALT))
            setAuthToken(token)
          })
          .catch((e) => {
            // potential need to signOut here if we want to clear session storage and handle error
            // sessionStorage.clear() 
            console.error(e)
          })
      } else {
        sessionStorage.clear()
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
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  )
}

export default App
