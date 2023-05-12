import moment from "moment";
import type { IPostWithMedia, PostStatus } from "../../types/Post";
import { PostStatus as PostStatusValues} from "../../types/Post";

interface IProps {
  showStatus?: boolean
  post: IPostWithMedia
}

const PostItem = ({post, showStatus = false}: IProps) => {

  const retrieveThumbnailMediaUrl = (post: IPostWithMedia) => {
    const thumbnailMedia = post.media?.find((m) => m.isThumbnail)
    if (thumbnailMedia)
      return thumbnailMedia.mediaUrl
    return ""
  }

  const styleStatus = (status: PostStatus) => {
    if (status == "APPROVED")
      return "bg-umeed-blue bg-opacity-10 text-umeed-blue"
    if (status == "IN_REVIEW")
      return "bg-gray-900 bg-opacity-10 text-umeed-gray"
    if (status =="REJECTED")
      return "bg-red-900 bg-opacity-10 text-red-900"
    return "hidden" // hide status because invalid value parsed
  }

  return ( 
    <div className="flex flex-initial flex-col overflow-hidden animate-slide-in">
      <img className="w-full h-full object-contain rounded-lg" src={retrieveThumbnailMediaUrl(post)} alt={post.title}/>
      <div className="p-2">
        <div className="text-md text-gray-700 text-ellipse line-clamp-2">
          {post.title} 
        </div>
        <div className="text-sm text-gray-500">
          {post.author} | {moment(post.updatedAt).fromNow()}
        </div>
        {showStatus &&
          <div className={`text-xs ${styleStatus(post.status)} rounded-md py-1 px-2 mt-2 w-fit`}>
            {post.status.replace("_"," ")}
          </div>
        }
      </div>
    </div> 
  );
}
 
export default PostItem;