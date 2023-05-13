import { useNavigate } from "react-router-dom";
import { useGetRelevantPosts } from "../../api/post";
import { useEffect, useState } from "react";
import { PostType } from "../../types/Post";
import AdminTabs from "../AdminDashboard/Components/AdminTabs";
import AdminTable from "./Components/AdminTable";
import { AdminNav } from "../../components";
import MyPostTable from "./Components/AdminPostTable";
import Search from "../../components/Search/Search";
import SearchContext from "../../context/SearchContext";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [postType, setPostType] = useState<PostType>("MY_POST");
  const [searchKeyword, setSearchKeyword] = useState<string>("");

  const { data, isLoading, refetch } = useGetRelevantPosts(postType, searchKeyword);

  if (!isLoading && data) {
    // console.log("^^^^^^^^^^^^^^^^^^^^^^", JSON.stringify(data));
    // setTableData(data);
  }

  useEffect(() => {
    refetch();
  }, [searchKeyword])

  useEffect(() => {
    refetch();
  }, [data])



  const handleUserPosts = () => {
    setPostType("USER_POST");
    refetch();
  };

  const handleMyPosts = () => {
    setPostType("MY_POST");
    // adminPostFetch();
    refetch();
  };


  return (
    <div className='bg-gray-50 flex flex-col min-h-screen'>
      <AdminNav />
      <div className='text-center my-10 pb-4'>
        <div className='w-full h-10 justify-center'>
          <div >
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

      </div>
      <div className="mx-10 ">
        <AdminTabs
          onUserPostClick={handleUserPosts}
          onMyPostClick={handleMyPosts}
          type={postType}
        />
        <div className='flex flex-row my-2 p-2 shadow '>
          {/* <input
            type='text'
            id='title-search'
            className='text-sm rounded-lg w-2/5 pl-10 p-2.5 outline-gray-300'
            placeholder='Search by titles...'></input> */}
          <SearchContext.Provider value={{ searchKeyword, setSearchKeyword }}>
            <Search />
          </SearchContext.Provider>
        </div>

        <div className="w-full">
          {postType === "USER_POST" && (
            <AdminTable tabData={data} />
          )}
          {postType === "MY_POST" && data && (
            <MyPostTable tabData={data} />
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
