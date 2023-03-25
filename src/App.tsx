import {
  BrowserRouter as Router,
} from "react-router-dom";
import { auth } from "./lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import UserContext from "./context/UserContext";
import Root from "./pages/Root";


function App() {
  const [user, setUser] = useState<string | null>("");
  
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      return auth.onAuthStateChanged(async (user) => {
        user ? setUser(user.uid) : setUser(null)
      });
    })
  },[])

  return (
    <UserContext.Provider value={user}>
      <Router>
        <Root/>
      </Router>
    </UserContext.Provider>
  )
}

export default App
