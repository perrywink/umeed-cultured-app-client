import moment from "moment";
import { IPost } from "../../types/Post";

interface IProps {
  post: IPost
}

const PostItem = ({post}: IProps) => {
  return ( 
    <div className="flex flex-col overflow-hidden">
      <img className="w-full h-full object-contain rounded-lg" src={post.mediaUrl} alt={post.title}/>
      <div className="text-md text-gray-700 text-ellipse">
        {post.title} 
      </div>
      <div className="text-sm text-gray-500">
        {post.authorId} | {moment(post.updatedAt).fromNow()}
      </div>
    </div> 
  );
}
 
export default PostItem;