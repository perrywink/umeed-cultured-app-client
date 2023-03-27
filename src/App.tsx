import {
  BrowserRouter as Router,
} from "react-router-dom";
import { auth } from "./config/firebase";
import { useEffect, useState } from "react";
import AuthContext from "./context/AuthContext";
import Root from "./pages/Root";


function App() {
  const [authToken, setAuthToken] = useState<string | null>(
    sessionStorage.getItem("auth_token")
  );

  useEffect(() => {
    return auth.onAuthStateChanged(async (user) => {
      if (user){
        sessionStorage.setItem("auth_token", user?.refreshToken)
        user ? setAuthToken(user.refreshToken) : setAuthToken(null)
      }
    });
  },[])

  return (
    <AuthContext.Provider value={authToken}>
      <Router>
        <Root/>
      </Router>
    </AuthContext.Provider>
  )
}

export default App
