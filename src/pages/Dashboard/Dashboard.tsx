import Nav from "../../components/Nav/Nav";

import { PostItem, Spinner } from "../../components";
import { useGetUserTags } from "../../api/user";
import { useSearchPosts } from "../../api/post";
import { useEffect, useState } from "react";
import { IUserOnTags } from "../../types/UsersOnTags";
import { IPostWithMedia } from "../../types/Post";
import { Tag } from "../../types/Tag";
import { ArrowDownCircleIcon, EllipsisHorizontalCircleIcon, FaceFrownIcon, NoSymbolIcon } from "@heroicons/react/24/outline";
import { useGetTagWithId } from "../../api/tag";
import { useInView } from "react-intersection-observer";
import React from "react";
import { Masonry } from "@mui/lab";
import SearchContext from "../../context/SearchContext";

const Dashboard = () => {
  const { data: userOnTags, isSuccess: getUserOnTagsSuccess } =
    useGetUserTags();
  const [tagIds, setTagIds] = useState<number[]>([]);
  const [numCols, setNumCols] = useState<number>(window.innerWidth >= 768 ? 5 : 2);
  const [searchKeyword, setSearchKeyword] = useState<string>("");

  const { data: tags, isSuccess: getTagsSuccess } = useGetTagWithId(tagIds);

  const { ref, inView } = useInView();

  const parseTags = () => {
    let result: number[];
    if (userOnTags) {
      let result = (userOnTags as IUserOnTags[]).map((tag) => {
        return tag.tagId;
      });
      setTagIds(result);
    }
  };
  const {
    data: posts,
    isSuccess: getPostsSuccess,
    refetch,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useSearchPosts(searchKeyword, tagIds);

  useEffect(() => parseTags(), [getUserOnTagsSuccess]);

  useEffect(() => {
    if (!!tagIds && tagIds.length > 0)
      refetch()
  }, [searchKeyword])

  useEffect(() => {
    if (inView && tagIds && tagIds.length > 0) {
      fetchNextPage();
    }
  }, [inView]);

  const alterCols = () => {
    if (window.innerWidth >= 768) {
      setNumCols(5)
    } 
    if (window.innerWidth < 768)  {
      setNumCols(2)
    }
  }

  useEffect(() => {
    window.addEventListener("resize", alterCols);
  }, []);


  return (
    <div className="min-h-screen">
      <SearchContext.Provider value={{searchKeyword, setSearchKeyword}}>
        <Nav searchKeyword={searchKeyword}/>
      </SearchContext.Provider>
      <div className="bg-white flex flex-col mt-2 mx-8">
        <div className="flex gap-2 my-4 items-end overflow-scroll scrollbar-hide">
          {getTagsSuccess &&
            tags.map((tag: Tag) => (
              <div
                key={tag.id}
                className="text-gray-600 bg-gray-100 text-xs font-medium mr-2 px-2.5 py-0.5 rounded mb-2"
              >
                {tag.name}
              </div>
            ))}
        </div>
        <Masonry columns={numCols} spacing={2} className="w-full">
          {getPostsSuccess &&
            posts &&
            posts.pages.map((page) => { 
              return (
              <React.Fragment key={page.pageBookmark}>
                {page.data.map((post: IPostWithMedia) => {
                  return <PostItem key={post.id} post={post} />;
                })}
              </React.Fragment>
            )})}
        </Masonry>
      </div>
      {getUserOnTagsSuccess && userOnTags?.length === 0 && (
        <div className="flex flex-col align-middle w-full h-full text-gray-400 mt-5 gap-2">
          <FaceFrownIcon className="w-7 h-7 mx-3 md:mx-auto" />
          <div className="mx-3 md:mx-auto">
            We customized your feed according to your interests. But ended up
            with nothing...
          </div>
        </div>
      )}
      <div className="w-full flex">
        <button
          ref={ref}
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
          className="bg-gray-100 p-3 mx-auto animate-slide-in mt-1 mb-3 text-gray-500"
        >
          {isFetchingNextPage
            ? <EllipsisHorizontalCircleIcon className="animate-ping w-5 h-5"/>
            : hasNextPage
            ? <ArrowDownCircleIcon className="w-5 h-5"/>
            : <div className="flex gap-3"><NoSymbolIcon className="w-5 h-5"/> Nothing left to see here.</div>}
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
