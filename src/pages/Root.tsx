import { Routes, Route, useNavigate } from "react-router-dom";
import { PrivateRoute } from "../components";
import { AuthForm, Dashboard } from "../pages";

function Root() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<AuthForm isLogin />} />
        <Route path="/register" element={<AuthForm isLogin={false} />} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      </Routes>
    </>
  );
}

export default Root;
