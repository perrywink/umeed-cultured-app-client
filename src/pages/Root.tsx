import { Routes, Route, useNavigate } from "react-router-dom";
import { PrivateRoute } from "../components";
import { Login, Register, Dashboard } from "../pages";
import { ToastContainer } from "react-toastify";

function Root() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default Root;
