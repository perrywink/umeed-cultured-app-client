import { useNavigate, useParams } from "react-router-dom";
import { useGetPost, useGetPostMedia } from "../../api/post";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowUturnLeftIcon,
} from "@heroicons/react/24/outline";
import moment from "moment";
import { useGetTagByPost } from "../../api/tag";
import { Tag } from "../../types/Tag";
import { Media } from "../../types/Post";
import { Carousel, IconButton } from "@material-tailwind/react";
import { Parser } from "html-to-react";

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

  return (
    <div className="flex flex-col lg:flex-row flex-grow">
      <div className="max-w-1/3">
        <Carousel className="mt-3 bg-gray-100">
          {media &&
            (media as Media[]).map((m, i) => (
              <div key={i}>
                <img src={m.mediaUrl} className="h-full w-full object-cover" />
              </div>
            ))}
        </Carousel>
      </div>
      <div className="p-5 bg-white w-full lg:min-w-2/3">
        <div className="border-b">
          <div className="flex w-full items-center justify-between mb-2">
            <ArrowUturnLeftIcon
              className="w-5 h-5 hover:text-umeed-tangerine-500 cursor-pointer"
              onClick={returnToPrevScreen}
            />
            <div className="flex items-center space-x-2">
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

        <div className="mt-4 mb-6">
          <div className="mb-3 text-xl font-bold">
            {getPostSuccess && post.title}
          </div>
          <div className="">
            {getPostSuccess && new Parser().parse(post.desc as string)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
