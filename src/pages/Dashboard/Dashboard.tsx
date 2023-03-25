import { auth } from "../../lib/firebase";
import { signOut } from "firebase/auth";

const Dashboard = () => {

  const handleSignout = () => {
    signOut(auth)
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12">
      <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
        <div className="px-5 py-7">Hello there! You're logged in :D</div>
        <button
          type="button"
          className="transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
          onClick={handleSignout}
        >
          <span className="inline-block mr-2"> Sign Out </span>
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
