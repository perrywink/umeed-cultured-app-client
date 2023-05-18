import { useGetRelevantPosts } from "../../api/post";
import { useEffect, useState } from "react";
import { PostType } from "../../types/Post";
import AdminTabs from "./components/AdminTabs";
import AdminTable from "./components/AdminTable";
import MyPostTable from "./components/AdminPostTable";
import Search from "../../components/Search/Search";
import SearchContext from "../../context/SearchContext";
import { Button } from "../../components";
import { PlusIcon } from "@heroicons/react/24/solid";
import MultipleInput from "../../components/Input/MultipleInput";
import Modal from "../../components/Modal/Modal";

const AdminDashboard = () => {
  const [postType, setPostType] = useState<PostType>("MY_POST");
  const [searchKeyword, setSearchKeyword] = useState<string>("");

  const { data, isLoading, refetch } = useGetRelevantPosts(
    postType,
    searchKeyword
  );

  useEffect(() => {
    refetch();
  }, [searchKeyword]);

  useEffect(() => {
    refetch();
  }, [data]);

  const handleUserPosts = () => {
    setPostType("USER_POST");
    refetch();
  };

  const handleMyPosts = () => {
    setPostType("MY_POST");
    refetch();
  };

  const handleCreateTags = () => {
    console.log("loveee")
    // return (
    //   <MultipleInput></MultipleInput>
    // )
  }

  return (
    <div className="bg-gray-50 flex flex-col min-h-screen">
      <div className="flex flex-row my-10 pb-6 mx-8">
        <div className="w-1/2 h-10 ">
          <div>
            <span className="font-cormorant rounded-none p-2 font-bold text-3xl">
              Admin Dashboard
            </span>
          </div>
          <div>
            <span className="font-manrope rounded-none p-2 font-regular text-lg text-slate-500">
              Welcome back, SuperUser
            </span>
          </div>
        </div>
        <div className="w-1/2 flex justify-end">
          <Modal icon={<div className="flex "><PlusIcon className="h-6 w-6 " /> Create Post Tags </div>}
          title="Create Tags" action="Create" onClick={handleCreateTags} body={<MultipleInput/>}></Modal>
          {/* <Button onClick={handleCreateTags}> <div className="flex "><PlusIcon className="h-6 w-6 " /> Create Post Tags </div></Button> */}
        </div>
      </div>
      <div className="mx-10 ">
        <AdminTabs
          onUserPostClick={handleUserPosts}
          onMyPostClick={handleMyPosts}
          type={postType}
        />
        <div className="flex flex-row my-2 p-2 shadow ">
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
          {postType === "USER_POST" && <AdminTable tabData={data} />}
          {postType === "MY_POST" && data && <MyPostTable tabData={data} />}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
