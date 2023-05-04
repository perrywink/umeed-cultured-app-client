import Nav from "../../components/Nav/Nav";

import { mockPosts } from "../../api/postsMock";
import { PostItem } from "../../components";
import { useGetUserTags } from "../../api/user";
import { useSearchPosts } from "../../api/post";
import { useEffect, useState } from "react";
import { IUserOnTags } from "../../types/UsersOnTags";
import { IPost } from "../../types/Post";

const Dashboard = () => {
  const { data: tags, isSuccess: getTagsSuccess } = useGetUserTags();
  const [ tagsState, setTagsState ] = useState<number[]>([]);

  const parseTags = () => {
    let result: number[]
    if (tags) {
      let result = (tags as IUserOnTags[]).map(tag => {
        return tag.tagId
      });
      setTagsState(result)
    }
  }
  const { data: posts, isSuccess: getPostsSuccess, refetch: refetchPosts } = useSearchPosts("", tagsState);

  useEffect(() => parseTags(), [getTagsSuccess])

  return (
    <div className="min-h-screen">
      <Nav/>
      <div className="bg-white flex flex-col justify-center mt-2 mx-4">
        <div className="columns-2 md:columns-4 max-w-7xl mx-auto space-y-4">
          {posts && posts.map((post: IPost) => {
            return (
              <PostItem key={post.id} post={post}/>
            )
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
