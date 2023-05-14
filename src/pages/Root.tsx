import { Routes, Route, useLocation } from "react-router-dom";
import { OnboardingRoute, PrivateRoute, AdminRoute, AdminNav, Nav } from "../components";
import {
  Login,
  Register,
  Dashboard,
  AdminDashboard,
  ResetPassword,
  Onboarding,
  Signout,
  CreatePost,
  UserPosts,
  Profile
} from "../pages";
import { ToastContainer } from "react-toastify";

function Root() {
  const location = useLocation().pathname;

  return (
    <div className="min-h-screen flex flex-col">
      {location.includes("/admin") && (
        <AdminNav />
      )}  
      {!location.includes("/admin") && (
        <Nav />
      )}
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
          path='/profile'
          element={
            <PrivateRoute>
              <Profile />
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
    </div>
  );
}

export default Root;
