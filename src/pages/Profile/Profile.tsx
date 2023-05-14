import { useEffect } from "react";
import { useGetUser } from "../../api/user";
import Nav from "../../components/Nav/Nav";
import { UserPosts } from "..";

const Profile = () => {
  const {data, isSuccess} = useGetUser()

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="relative flex flex-col items-center rounded-[20px] w-[400px] mx-auto p-4 bg-white bg-clip-border shadow-3xl shadow-shadow-500 ">
        <div className="relative flex h-32 w-full justify-center rounded-xl bg-cover">
          <img
            src="https://horizon-tailwind-react-git-tailwind-components-horizon-ui.vercel.app/static/media/banner.ef572d78f29b0fee0a09.png"
            className="absolute flex h-32 w-full justify-center rounded-xl bg-cover"
          />
          <div className="absolute -bottom-12 flex h-[87px] w-[87px] items-center justify-center rounded-full border-[4px] border-white bg-pink-400 ">
            <img
              className="h-full w-full rounded-full"
              src="https://horizon-tailwind-react-git-tailwind-components-horizon-ui.vercel.app/static/media/avatar11.1060b63041fdffa5f8ef.png"
              alt=""
            />
          </div>
        </div>
        <div className="mt-16 flex flex-col items-center">
          <h4 className="text-xl font-bold text-navy-700 ">
            @{isSuccess && data.username}
          </h4>
          <p className="text-base font-normal text-gray-600">{isSuccess && data.userType == "USER" ? "Regular User" : "Admin"}</p>
        </div>

      </div>
      <UserPosts />

    </div>
  );
};

export default Profile;
