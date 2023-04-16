import { Routes, Route, useNavigate } from "react-router-dom";
import { PrivateRoute } from "../components";
import { Login, Register, Dashboard, ResetPassword, Onboarding } from "../pages";
import { ToastContainer } from "react-toastify";

function Root() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/onboarding" element={<Onboarding />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default Root;
