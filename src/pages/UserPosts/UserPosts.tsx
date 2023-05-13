import Nav from "../../components/Nav/Nav";

import { PostItem } from "../../components";
import { useSearchUserPosts } from "../../api/post";
import { useEffect, useState } from "react";
import { IPostWithMedia } from "../../types/Post";
import { ArrowDownCircleIcon, EllipsisHorizontalCircleIcon, FaceFrownIcon, NoSymbolIcon } from "@heroicons/react/24/outline";
import { useInView } from "react-intersection-observer";
import React from "react";
import { Masonry } from "@mui/lab";

const UserPosts = () => {
  const [numCols, setNumCols] = useState<number>(5);

  const { ref, inView } = useInView();

  const {
    data,
    isSuccess,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useSearchUserPosts("");


  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  const alterCols = () => {
    if (window.innerWidth >= 768) {
      setNumCols(5)
    } else {
      setNumCols(2)
    }
  }

  useEffect(() => {
    alterCols()
    window.addEventListener("resize", () => {
      alterCols()
    });
    return () => {
      window.removeEventListener("resize", () => {});
    };
  }, []);


  return (
    <div className="min-h-screen">
      <Nav />
      <div className="bg-white flex flex-col mt-2 mx-8">
        <div className="my-4">
          <div className="text-xl font-semibold text-gray-800">Your Posts</div>
          <div className="text-xs text-gray-700">These are posts you have uploaded to the site.</div>
        </div>
        <Masonry columns={numCols} spacing={2} className="w-full">
          {isSuccess &&
            data &&
            data.pages.map((page) => { 
              return (
              <React.Fragment key={page.pageBookmark}>
                {page.data.map((post: IPostWithMedia) => {
                  return <PostItem key={post.id} post={post} showStatus/>;
                })}
              </React.Fragment>
            )})}
        </Masonry>
      </div>
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

export default UserPosts;
