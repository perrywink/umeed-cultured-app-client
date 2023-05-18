import { useNavigate, useParams } from "react-router-dom";
import { useGetPost, useGetPostMedia } from "../../api/post";
import { ArrowUturnLeftIcon } from "@heroicons/react/24/outline";
import moment from "moment";
import { useGetTagByPost } from "../../api/tag";
import { Tag } from "../../types/Tag";
import { Media } from "../../types/Post";
import { Carousel } from "@material-tailwind/react";
import DOMPurify from "dompurify";

const Post = () => {
  const { postId } = useParams();
  const navigate = useNavigate();

  const { data: post, isSuccess: getPostSuccess } = useGetPost(
    parseInt(postId as string)
  );
  const { data: tags, isSuccess: getPostTagsSuccess } = useGetTagByPost(postId);
  const { data: media } = useGetPostMedia(parseInt(postId as string));

  const returnToPrevScreen = () => {
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate("/", { replace: true }); // the current entry in the history stack will be replaced with the new one with { replace: true }
    }
  };

  const renderHTMLData = (rawHtml: string) => {
    const sanitizedData = () => ({
      __html: DOMPurify.sanitize(rawHtml),
    });
    return <div dangerouslySetInnerHTML={sanitizedData()} />;
  };

  return (
    <div className="flex flex-grow">
      
      <div className="p-5 bg-white w-full lg:min-w-2/3">
        <div className="border-b">
          <div className="flex flex-col lg:flex-row w-full items-left lg:items-center justify-between mb-2">
            <div className="flex flex-row">
              <div className="flex items-center">
                <ArrowUturnLeftIcon
                  className="w-5 h-5 hover:text-umeed-tangerine-500 cursor-pointer items-center justify-center mr-5"
                  onClick={returnToPrevScreen}
                />
              </div>
              <div className="items-end text-4xl lg:text-5xl font-bold">
                {getPostSuccess && post.title}
              </div>
            </div>
            <div className="flex items-center space-x-2 ml-10 mt-3 lg:ml-0 lg:mt-0">
              {getPostTagsSuccess &&
                !!tags &&
                tags.map(({ tag }: { tag: Tag }) => (
                  <div
                    className="rounded-2xl border bg-neutral-100 px-3 py-1 text-xs font-semibold"
                    key={tag.id}
                  >
                    {tag.name}
                  </div>
              ))}
              <div className="text-xs text-neutral-500">
                {getPostSuccess && moment(post.updatedAt).fromNow()}
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 lg:ml-10 mt-3 lg:mt-10">
          <div className="w-full h-fit my-2">
            {media && (
              <Carousel className="bg-gray-100 lg:max-h-none rounded-xl">
                {(media as Media[]).map((m, i) => (
                  <div key={i}>
                    <img src={m.mediaUrl} className="h-full w-full object-cover" />
                  </div>
                ))}
              </Carousel>
            )}
          </div>
          <div className="mx-auto mt-4 mb-6 prose prose-sm lg:prose-md col-span-2 w-full">
            <div className="quill">{getPostSuccess && renderHTMLData(post.desc)}</div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Post;
