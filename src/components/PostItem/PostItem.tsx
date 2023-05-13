import moment from "moment";
import { useGetUserName } from "../../api/user";
import { IPostWithMedia } from "../../types/Post";

interface IProps {
  post: IPostWithMedia
}

const PostItem = ({post}: IProps) => {

  const retrieveThumbnailMediaUrl = (post: IPostWithMedia) => {
    const thumbnailMedia = post.media?.find((m) => m.isThumbnail)
    if (thumbnailMedia)
      return thumbnailMedia.mediaUrl
    return ""
  }

  return ( 
    <div className="flex flex-initial flex-col overflow-hidden animate-slide-in">
      <img className="w-full h-full object-contain rounded-lg" src={retrieveThumbnailMediaUrl(post)} alt={post.title}/>
      <div className="p-2 pt-1">
        <div className="text-sm md:text-md text-gray-700 text-ellipse line-clamp-2">
          {post.title} 
        </div>
        <div className="text-xs md:text-sm text-gray-500">
          {post.author} | {moment(post.updatedAt).fromNow()}
        </div>
      </div>
    </div> 
  );
}
 
export default PostItem;