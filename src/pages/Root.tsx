import { Routes, Route } from "react-router-dom";
import { OnboardingRoute, PrivateRoute } from "../components";
import {
  Login,
  Register,
  Dashboard,
  AdminDashboard,
  ResetPassword,
  Onboarding,
  Signout,
  CreatePost,
  UserPosts
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
          path='/user-posts'
          element={
            <PrivateRoute>
              <UserPosts />
            </PrivateRoute>
          }
        />
        <Route
          path='/admin'
          element={
            <PrivateRoute>
              <AdminDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path='/admin/post'
          element={
            <PrivateRoute>
              <CreatePost />
            </PrivateRoute>
          }
        />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default Root;
