import Nav from "../../components/Nav/Nav";

import { PostItem, Spinner } from "../../components";
import { useGetUserTags } from "../../api/user";
import { useSearchPosts } from "../../api/post";
import { useEffect, useState } from "react";
import { IUserOnTags } from "../../types/UsersOnTags";
import { IPostWithMedia } from "../../types/Post";
import { Tag } from "../../types/Tag";
import { FaceFrownIcon } from "@heroicons/react/24/solid";
import { useGetTagWithId } from "../../api/tag";

const Dashboard = () => {
  const { data: userOnTags, isSuccess: getUserOnTagsSuccess } =
    useGetUserTags();
  const [tagIds, setTagIds] = useState<number[]>([]);

  const { data: tags, isSuccess: getTagsSuccess } = useGetTagWithId(tagIds);

  const parseTags = () => {
    let result: number[];
    if (userOnTags) {
      let result = (userOnTags as IUserOnTags[]).map((tag) => {
        return tag.tagId;
      });
      setTagIds(result);
    }
  };
  const { data: posts, isSuccess: getPostsSuccess } = useSearchPosts(
    "",
    tagIds
  );

  useEffect(() => parseTags(), [getUserOnTagsSuccess]);

  return (
    <div className="min-h-screen">
      <Nav />
      <div className="bg-white flex flex-col mt-2 mx-8">
        <div className="flex gap-2 my-4 items-end overflow-scroll scrollbar-hide">
          {getTagsSuccess &&
            tags.map((tag: Tag) => (
              <div key={tag.id} className="text-gray-600 bg-gray-100 text-xs font-medium mr-2 px-2.5 py-0.5 rounded mb-2">
                {tag.name}
              </div>
          ))}
        </div>
        <div className="columns-2 md:columns-4 space-y-4">
          {getPostsSuccess &&
            posts &&
            posts.map((post: IPostWithMedia) => {
              return <PostItem key={post.id} post={post} />;
            })}
        </div>
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
    </div>
  );
};

export default Dashboard;
