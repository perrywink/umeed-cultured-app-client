import Nav from "../../components/Nav/Nav";

import { PostItem, SelectTags, Spinner } from "../../components";
import { useGetUserTags } from "../../api/user";
import { useSearchPosts } from "../../api/post";
import { useEffect, useState } from "react";
import { IUserOnTags } from "../../types/UsersOnTags";
import { IPostWithMedia } from "../../types/Post";
import { Tag } from "../../types/Tag";
import {
  ArrowDownCircleIcon,
  EllipsisHorizontalCircleIcon,
  FaceFrownIcon,
  NoSymbolIcon,
} from "@heroicons/react/24/outline";
import { useGetTagWithId } from "../../api/tag";
import { useInView } from "react-intersection-observer";
import React from "react";
import { Masonry } from "@mui/lab";
import { toast } from "react-toastify";
import SearchContext from "../../context/SearchContext";

const Dashboard = () => {
  const [tagIds, setTagIds] = useState<number[]>([]);
  const [numCols, setNumCols] = useState<number>(window.innerWidth >= 768 ? 5 : 2);
  const [searchKeyword, setSearchKeyword] = useState<string>("");

  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

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

  const { data: userOnTags, isSuccess: getUserOnTagsSuccess } =
    useGetUserTags();
  const { data: tags, isSuccess: getTagsSuccess } = useGetTagWithId(tagIds);
  const {
    data: posts,
    isSuccess: getPostsSuccess,
    refetch,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useSearchPosts(
    searchKeyword,
    selectedTags.map((t) => t.id)
  );

  useEffect(() => {
    if (tags) {
      setSelectedTags(tags);
    }
  }, [getTagsSuccess]);

  useEffect(() => {
    // if (!!selectedTags && selectedTags.length > 0)
    refetch();
  }, [selectedTags]);

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
  };

  useEffect(() => {
    window.addEventListener("resize", alterCols);
  }, []);

  const renderEmptyState = () => {
    if (!!posts && posts.pages[0]?.data?.length <= 0) {
      return (
        <div className="flex flex-col align-middle w-full h-full text-gray-400 mt-5 gap-2">
          <FaceFrownIcon className="w-7 h-7 mx-3 md:mx-auto" />
          <div className="mx-3 md:mx-auto">
            Nothing to see here. Try adding more tags to view posts.
          </div>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen">
      <SearchContext.Provider value={{searchKeyword, setSearchKeyword}}>
        <Nav searchKeyword={searchKeyword}/>
      </SearchContext.Provider>
      <div className="bg-white flex flex-col mt-2 mx-8">
        <div className="mb-3">
          <SelectTags selectedTagsState={{ selectedTags, setSelectedTags }} />
        </div>
        {renderEmptyState()}
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
              );
            })}
        </Masonry>
      </div>
      <div className="w-full flex">
        <button
          ref={ref}
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
          className="bg-gray-100 p-3 mx-auto animate-slide-in mt-1 mb-3 text-gray-500"
        >
          {isFetchingNextPage ? (
            <EllipsisHorizontalCircleIcon className="animate-ping w-5 h-5" />
          ) : hasNextPage ? (
            <ArrowDownCircleIcon className="w-5 h-5" />
          ) : (
            <div className="flex gap-3">
              <NoSymbolIcon className="w-5 h-5" /> Nothing left to see here.
            </div>
          )}
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
