import { auth } from "../../config/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components";
import { useGetRelevantPosts } from "../../api/post";
import { useEffect, useState } from "react";
import { Post, PostType } from "../../types/Post";
import { title } from "process";
import AdminTabs from "../AdminDashboard/Components/AdminTabs";

const TableData = (params: any) => {
  let content = params.tabData || [];

  console.log("#####################", JSON.stringify(content));
  return (
    <div>
      {content.map((product: any) => (
        <div>
          <h3> {product.title}</h3>
        </div>
      ))}
    </div>
  );
};

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [postType, setPostType] = useState<PostType>("MY_POST");
  const { data, isLoading, refetch } = useGetRelevantPosts(postType);

  if (!isLoading && data) {
    console.log("^^^^^^^^^^^^^^^^^^^^^^", JSON.stringify(data));
    // setTableData(data);
  }

  const handleSignout = () => {
    signOut(auth);
    sessionStorage.clear();
    navigate("/login");
  };

  const handleUserPosts = () => {
    setPostType("USER_POST");
    refetch();
  };

  const handleMyPosts = () => {
    setPostType("MY_POST");
    refetch();
  };

  return (
    <div className='min-h-screen mx-20'>
      <div className='flex flex-row my-10 pb-4'>
        <div className='w-5/6 h-10'>
          <div>
            <span className='font-cormorant rounded-none p-2 font-bold text-3xl'>
              Admin Dashboard
            </span>
          </div>
          <div>
            <span className='font-manrope rounded-none p-2 font-regular text-lg text-slate-500'>
              Welcome back, SuperUser
            </span>
          </div>
        </div>

        <Button
          className='font-manrope rounded-none p-2 font-regular mt-3 w-40 h-10 tracking-wide transition-colors duration-300 transform focus:outline-none bg-umeed-tangerine-300 text-gray-800 hover:bg-umeed-tangerine-700 hover:text-white'
          onClick={handleSignout}>
          Add Admin User
        </Button>
      </div>

      <AdminTabs
        onUserPostClick={handleUserPosts}
        onMyPostClick={handleMyPosts}
      />

      <div className='flex flex-row my-2 p-2 shadow dark:bg-gray-100'>
        <input
          type='text'
          id='title-search'
          className='text-sm rounded-lg w-2/5 pl-10 p-2.5 dark:bg-white dark:border-gray-100 dark:placeholder-gray-400 dark:text-black'
          placeholder='Search by titles...'></input>
      </div>

      <TableData tabData={data} />
    </div>
  );
};

export default AdminDashboard;
