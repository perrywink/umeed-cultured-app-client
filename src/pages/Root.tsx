import { Routes, Route, useNavigate } from "react-router-dom";
import { PrivateRoute } from "../components";
import { Login, Register, Dashboard } from "../pages";

function Root() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      </Routes>
    </>
  );
}

export default Root;
