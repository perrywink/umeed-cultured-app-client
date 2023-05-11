import { Routes, Route } from "react-router-dom";
import { OnboardingRoute, PrivateRoute, AdminRoute } from "../components";
import {
  Login,
  Register,
  Dashboard,
  AdminDashboard,
  ResetPassword,
  Onboarding,
  Signout,
  CreatePost
} from "../pages";
import { ToastContainer } from "react-toastify";

function Root() {
  return (
    <>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/signout' element={<Signout />} />
        <Route path='/reset-password' element={<ResetPassword />} />
        <Route
          path='/onboarding'
          element={
            <OnboardingRoute>
              <Onboarding />
            </OnboardingRoute>
          }
        />
        <Route
          path='/'
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path='/post'
          element={
            <PrivateRoute>
              <CreatePost />
            </PrivateRoute>
          }
        />
        <Route
          path='/admin'
          element={
            <PrivateRoute>
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            </PrivateRoute>
          }
        />
        <Route
          path='/admin/post'
          element={
            <PrivateRoute>
              <AdminRoute>
                <CreatePost />
              </AdminRoute>
            </PrivateRoute>
          }
        />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default Root;
