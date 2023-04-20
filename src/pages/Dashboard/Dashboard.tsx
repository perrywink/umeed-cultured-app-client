import { auth } from "../../config/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components";

const Dashboard = () => {
  const navigate = useNavigate();
  const handleSignout = () => {
    signOut(auth)
    sessionStorage.clear()
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12">
      <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
        <div className="px-5 py-7">Hello there! You're logged in :D</div>
        <Button onClick={handleSignout} >
            Sign out
        </Button>
      </div>
    </div>
  );
};

export default Dashboard;
