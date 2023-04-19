import { Routes, Route } from "react-router-dom";
import { OnboardingRoute, PrivateRoute } from "../components";
import { Login, Register, Dashboard, ResetPassword, Onboarding} from "../pages";
import { ToastContainer } from "react-toastify";
import { useGetUser } from "../api/user";
import { useEffect } from "react";
import { useUserContext } from "../context/UserContext";

function Root() {
  const {data} = useGetUser();
  const {setUser} = useUserContext();
  useEffect(() => setUser(data), [data])

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/onboarding" element={<OnboardingRoute><Onboarding /></OnboardingRoute>} />
        <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default Root;
