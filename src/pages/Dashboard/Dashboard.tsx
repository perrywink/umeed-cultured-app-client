import { useNavigate } from "react-router-dom";
import Nav from "../../components/Nav/Nav";


const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      <Nav/>
      <div className="bg-gray-100 flex flex-col justify-center sm:py-12">
        <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
            
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
