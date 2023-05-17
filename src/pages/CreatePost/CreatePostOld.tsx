import { auth, storage } from "../../config/firebase";
import {
  Button,
  Input,
  Spinner,
  TextareaInput,
  FileInput,
} from "../../components";
import { useEffect, useState } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import {
  useAssignPostTags,
  useCreateMedia,
  useCreatePost,
  useDeletePostMedia,
  useGetPost,
  useGetPostMedia,
  useGetPostTags,
} from "../../api/post";
import { Media, Post } from "../../types/Post";
import { useGetTagWithId, useSearchTags } from "../../api/tag";
import { Tag } from "../../types/Tag";
import Select, { MultiValue } from "react-select";
import React from "react";
import { useFormValidator } from "../../hooks";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import { useLocation } from "react-router-dom";
import { SelectOption } from "../../components/SelectTags/SelectTags";
import { CloudArrowUpIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { BookmarkIcon, PlusIcon } from "@heroicons/react/24/solid";
import UploadImgEmptyState from "./components/UploadImgEmptyState";
import UploadedImage from "./components/UploadedImage";

export type IPreviewItems = {
  url: string;
  filename: string;
  isFirebaseUrl: boolean;
};

export type IThumbnail = {
  url: string;
  filename: string;
};

const CreatePost = () => {
  const [mediaUpload, setMediaUpload] = useState<File[]>([]);
  const [searchTagsKeyword, setSearchTagsKeyword] = useState<string>("");
  const { data, refetch, isLoading } = useSearchTags(searchTagsKeyword);
  const [selectedTags, setSelectedTags] = useState<SelectOption[]>([]);
  const [preview, setPreview] = useState<IPreviewItems[]>([]);
  const [title, setTitle] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [thumbnail, setThumbnail] = useState<IThumbnail>();
  const { checkEmptyFields } = useFormValidator();
  const params = new URLSearchParams(useLocation().search);
  const refer = React.useRef<HTMLInputElement>(null);

  const { mutateAsync: createMedia } = useCreateMedia();
  const { mutateAsync: createPost } = useCreatePost();
  const { mutateAsync: assignPostTags } = useAssignPostTags();
  const { mutateAsync: deletePostMedia } = useDeletePostMedia();

  const { data: postData, isSuccess: getPostSuccess } = useGetPost(
    parseInt(params.get("postId") as string)
  );
  const { data: postTags } = useGetPostTags(
    parseInt(params.get("postId") as string)
  );
  const { data: tags, isSuccess: getTagsSuccess } = useGetTagWithId(
    postTags?.map((pt: { tagId: number }) => pt.tagId)
  );
  const { data: media, isSuccess: getMediaSuccess } = useGetPostMedia(
    parseInt(params.get("postId") as string)
  );

  useEffect(() => {
    refetch();
  }, [searchTagsKeyword]);

  useEffect(() => {
    if (getPostSuccess && postData) {
      setTitle(postData.title);
      setAuthor(postData.author);
      setDesc(postData.desc);
    }
  }, [getPostSuccess]);

  useEffect(() => {
    if (getTagsSuccess && tags) {
      setSelectedTags(
        tags.map((t: { id: number; name: string }) => ({
          value: t.id,
          label: t.name,
        }))
      );
    }
  }, [getTagsSuccess]);

  useEffect(() => {
    if (getMediaSuccess && media) {
      setPreview(
        media.map((m: Media) => ({
          url: m.mediaUrl,
          filename: "",
          isFirebaseUrl: true,
        }))
      );
    }
  }, [getMediaSuccess]);

  const validateForm = () => {
    if (
      !checkEmptyFields([title, author, desc]) ||
      preview.length == 0 ||
      selectedTags.length <= 0
    ) {
      toast.error("All required fields are not filled up.");
      return false;
    }
    if (!thumbnail || thumbnail.url.trim() == "") {
      toast.error("Please select an image as thumbnail");
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    setLoading(true);

    const newPost: Post = {
      id: params?.get("postId") ? parseInt(params.get("postId") as string) : 0,
      title: title,
      author: author,
      desc: desc,
    };
    try {
      const res = await createPost(newPost);
      await assignPostTags({
        tagIds: selectedTags.map((o) => o.value),
        postId: res.data.id,
      });
      if (params.get("postId")) {
        const postId = parseInt(params.get("postId") as string);
        await deletePostMedia({ postId });
        await sendPreExistingMedia(postId);
      }
      await uploadFile(res.data.id);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
      toast.success("Post published");
    }
  };

  const sendPreExistingMedia = async (postId: number) => {
    preview.map(async (p) => {
      if (p.isFirebaseUrl) {
        if (p.url == thumbnail?.url) {
          await sendMediaData(p.url, true, postId);
        } else {
          await sendMediaData(p.url, false, postId);
        }
      }
    });
  };

  const loadOptions = () => {
    if (!isLoading && data) {
      const tags = data as Tag[];
      return tags.map((tag) => ({
        value: tag.id,
        label: tag.name,
      }));
    }
  };

  const onChange = (
    selectedOptions: MultiValue<{
      value: number;
      label: string;
    }>
  ) => {
    setSelectedTags([...selectedOptions]);
  };

  const sendMediaData = async (
    url: string,
    isThumbnail: boolean,
    postId: number
  ) => {
    let media: Media = {
      mediaUrl: url,
      postId,
      isThumbnail,
    };
    await createMedia(media);
  };

  const uploadFile = async (postId: number) => {
    if (mediaUpload !== undefined && mediaUpload?.length) {
      for (let i = 0; i < mediaUpload?.length; i++) {
        const mediaRef = ref(
          storage,
          `${auth.currentUser?.uid}/${mediaUpload[i].name}` + uuidv4()
        );
        const snapshot = await uploadBytes(mediaRef, mediaUpload[i]);
        const url = await getDownloadURL(snapshot.ref);
        if (mediaUpload[i].name == thumbnail?.filename) {
          await sendMediaData(url, true, postId);
        } else {
          await sendMediaData(url, false, postId);
        }
      }
    }
  };

  const checkDuplicateFile = (name: string) =>
    mediaUpload.some((media) => {
      if (media.name === name) {
        return true;
      }
      return false;
    });

  const selectFiles = ({
    currentTarget: { files },
  }: React.ChangeEvent<HTMLInputElement>) => {
    if (files && files.length) {
      if (checkDuplicateFile(files[0].name)) {
        toast.error("File already Uploaded !");
      } else {
        setMediaUpload((existing) => [...existing, ...files]);
        let url = URL.createObjectURL(files[0]);
        setPreview((e) => [
          ...e,
          { url, filename: files[0].name, isFirebaseUrl: false },
        ]);
      }
    }
  };

  const removeImage = (url: string, filename: string) => {
    if (thumbnail?.url == url || thumbnail?.filename == filename) {
      setThumbnail({ url: "", filename: "" });
    }
    setPreview(preview.filter((x) => x.url !== url));
    setMediaUpload(mediaUpload.filter((x) => x.name !== filename));
  };

  const renderUploadBtn = () => {
    if (preview.length < 4) {
      return (
        <div>
          <FileInput
            ref={refer}
            type="file"
            onChange={selectFiles}
            hidden
            accept="image/*"
          />
          <Button
            styles="mt-5 w-fit rounded-md"
            onClick={() => refer.current?.click()}
          >
            <PlusIcon className="h-8 w-8 " />
          </Button>
        </div>
      );
    }
  };

  return (
    <div className="bg-white flex flex-col lg:flex-row flex-grow">
      <div className="flex justify-center border-dashed border-2 border-gray-400 mx-auto max-w-xl lg:max-w-sm">
        <div className="flex flex-col items-center justify-center h-full lg:h-auto rounded-md ">
          <UploadImgEmptyState
            preview={preview}
            onChange={selectFiles}
            ref={refer}
          />

          {preview.length > 0 && (
            <div className="flex p-5 gap-2 place-items-center">
              {preview.map((img, key) => (
                <div key={key} className="w-full h-full relative">
                  <UploadedImage
                    img={img}
                    thumbnail={thumbnail}
                    removeImage={removeImage}
                    setThumbnail={setThumbnail}
                  />
                </div>
              ))}
            </div>
          )}

          {renderUploadBtn()}
        </div>
      </div>
      <div className="p-3 mx-0 md:mx-auto md:pl-0 md:w-full md:max-w-xl flex flex-col justify-center">
        <div className="px-5 pb-7 md:pl-0">
          <Input
            type="text"
            label="Post Title"
            placeholder="Your title here"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />

          <Input
            type="text"
            label="Author"
            placeholder="Author of the post"
            onChange={(e) => setAuthor(e.target.value)}
            value={author}
          />

          <TextareaInput
            label="Post Description"
            placeholder="What is this post about"
            rows={6}
            onChange={(e) => setDesc(e.target.value)}
            value={desc}
          />
          <label className="font-bold font-cormorant text-xl text-gray-600 pb-1 block">
            {" "}
            Tags{" "}
          </label>
          <Select
            closeMenuOnSelect={false}
            isMulti
            options={loadOptions()}
            onInputChange={(keyword) => setSearchTagsKeyword(keyword as string)}
            onChange={onChange}
            value={[...selectedTags]}
          />
          <Button styles="mt-5 w-full text-lg" onClick={handleSubmit}>
            {params.get("postId") ? (
              loading ? (
                <Spinner />
              ) : (
                "Edit Post"
              )
            ) : loading ? (
              <Spinner />
            ) : (
              "Post"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
