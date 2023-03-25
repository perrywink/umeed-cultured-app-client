import { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import { AuthForm, Dashboard } from "../pages";

function Root() {
  const user = useUserContext();

  return (
    <>
      {/* {user ? (
        <>
          <Routes>
            <Route path="/login" element={<AuthForm isLogin />} />
            <Route path="/register" element={<AuthForm isLogin={false} />} />
          </Routes>
        </>
      ) : (
        <>
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </>
      )} */}
      <Routes>
        <Route path="/login" element={<AuthForm isLogin />} />
        <Route path="/register" element={<AuthForm isLogin={false} />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default Root;
