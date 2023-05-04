import moment from "moment";
import { useGetUserName } from "../../api/user";
import { IPost } from "../../types/Post";

interface IProps {
  post: IPost
}

const PostSubtitle = ({post}: IProps) => {
  const {data: authorUser} = useGetUserName(post.authorId);
  return (
    <div className="text-sm text-gray-500">
      {authorUser && authorUser.username} | {moment(post.updatedAt).fromNow()}
    </div>
  )
}

const PostItem = ({post}: IProps) => {
  return ( 
    <div className="flex flex-col overflow-hidden">
      <img className="w-full h-full object-contain rounded-lg" src={post.mediaUrl} alt={post.title}/>
      <div className="text-md text-gray-700 text-ellipse line-clamp-2">
        {post.title} 
      </div>
      <PostSubtitle post={post}/>
    </div> 
  );
}
 
export default PostItem;