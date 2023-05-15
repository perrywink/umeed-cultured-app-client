import { auth, storage } from "../../config/firebase";
import {
  Button,
  Input,
  Spinner,
  TextareaInput,
  FileInput,
  AdminNav,
} from "../../components";
import { useEffect, useState } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import {
  useAssignPostTags,
  useCreateMedia,
  useCreatePost,
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
import Nav from "../../components/Nav/Nav";
import { SelectOption } from "../../components/SelectTags/SelectTags";

const CreatePost = () => {
  const [mediaUpload, setMediaUpload] = useState<File[]>([]);
  // const [imageUrls, setImageUrls] = useState<[string, boolean]>(["", false]);
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const { data, refetch, isLoading } = useSearchTags(searchKeyword);
  const [selectedTags, setSelectedTags] = useState<SelectOption[]>([]);
  const [preview, setPreview] = useState<[string, string, string][]>([]);
  const [title, setTitle] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  // const [postId, setPostId] = useState<number>(0);
  const { checkEmptyFields } = useFormValidator();
  const location = useLocation().pathname;
  const params = new URLSearchParams(useLocation().search);
  const refer = React.useRef<HTMLInputElement>(null);

  const { mutateAsync: createMedia } = useCreateMedia();
  const { mutateAsync: createPost } = useCreatePost();
  const { mutateAsync: assignPostTags } = useAssignPostTags();

  const {
    data: postData,
    isLoading: postLoading,
    refetch: getPosts,
  } = useGetPost(parseInt(params.get("postId") as string));
  const { data: postTags } = useGetPostTags(
    parseInt(params.get("postId") as string)
  );
  const { data: tags, isSuccess: getTagsSuccess } = useGetTagWithId(
    postTags?.map((pt: { tagId: number }) => pt.tagId)
  );
  const { data: media, isSuccess: getMediaSuccess } = useGetPostMedia(
    parseInt(params.get("postId") as string)
  );

  console.log("hereee", media);

  useEffect(() => {
    refetch();
  }, [searchKeyword]);

  useEffect(() => {
    if (mediaUpload) {
      let array: [string, string, string][] = [];

      for (let i = 0; i < mediaUpload.length; i++) {
        let url = URL.createObjectURL(mediaUpload[i]);
        array.push([url, mediaUpload[i].name, mediaUpload[i].type]);
      }
      setPreview([...array]);
      console.log("preview", preview);
    }
  }, [mediaUpload]);

  // useEffect(() => {
  //   if (imageUrls[0] != "") {
  //     sendMediaData();
  //   }
  // }, [imageUrls]);

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
      console.log("Media", media);
      setPreview(media.map((m: Media) => [m.mediaUrl, "", ""]));
    }
  }, [getMediaSuccess]);

  const validateForm = () => {
    if (!checkEmptyFields([title, author, desc]) || mediaUpload.length == 0 || selectedTags.length<=0) {
      toast.error("All required fields are not filled up.");
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
    console.log("heloooo", newPost.id);
    try {
      const res = await createPost(newPost);
      await assignPostTags({ tagIds: selectedTags.map((o) => o.value), postId: res.data.id });
      await uploadFile(res.data.id);
    } catch (err) {
      console.log(err);
    } finally {
      console.log("doneeeee")
      setLoading(false);
    }
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

  const sendMediaData = async (url: string, isThumbnail: boolean, postId: number) => {
    console.log("sendMediaData", url);
    console.log("sendMediaData", postId);
    let media: Media = {
      mediaUrl: url,
      postId,
      isThumbnail
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
        const snapshot = await uploadBytes(mediaRef, mediaUpload[i])
        const url = await getDownloadURL(snapshot.ref)
        if (i == 0) {
          await sendMediaData(url, true, postId);
        } else {
          await sendMediaData(url, false, postId);

        }

      }
    }
  };

  const checkDuplicateFile = (name: string) => mediaUpload.some(media => {
    if (media.name === name) {
      return true;
    }
    return false;
  })



  const selectFiles = ({
    currentTarget: { files },
  }: React.ChangeEvent<HTMLInputElement>) => {
    if (files && files.length) {
      console.log("condition", checkDuplicateFile(files[0].name));
      if (checkDuplicateFile(files[0].name)) {
        toast.error("File already Uploaded !");
      } else {
        console.log(files);
        console.log(mediaUpload);
        setMediaUpload((existing) => [...existing, ...files]);
      }
    }
  };

  const removeImage = (url: string, filename: string) => {
    setPreview(preview.filter((x) => x[0] !== url));
    setMediaUpload(mediaUpload.filter((x) => x.name !== filename));
  };

  return (
    <div className="bg-gray-50 flex flex-col min-h-screen">
      {location.includes("/admin") && <AdminNav />}
      {!location.includes("/admin") && <Nav renderSearch={false} />}

      {/* <div className="text-center font-cormorant text-5xl font-bold text-umeed-blue">
                Create Post
            </div> */}
      <div className="grid md:grid-cols-2 h-full flex-1">
        <div className="md:block justify-center md:py-24 py-10 px-7 md:h-full h-auto">
          <div
            id="overlay"
            className="py-3 md:h-full mx-0 md:mx-auto md:w-full md:max-w-xl flex flex-col items-center justify-center rounded-md border-dashed border-2 border-gray-400"
          >
            {preview.length == 0 && (
              <div className="flex flex-col items-center justify-center">
                <i>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21.2 15c.7-1.2 1-2.5.7-3.9-.6-2-2.4-3.5-4.4-3.5h-1.2c-.7-3-3.2-5.2-6.2-5.6-3-.3-5.9 1.3-7.3 4-1.2 2.5-1 6.5.5 8.8m8.7-1.6V21" />
                    <path d="M16 16l-4-4-4 4" />
                  </svg>
                </i>
                <p className="text-md text-gray-600 font-light">
                  Browse and choose files from your device
                </p>
              </div>
            )}

            {preview.length > 0 && (
              <div className="grid grid-cols-2 p-5 gap-2 place-items-center">
                {preview.map((img, key) => (
                  <div key={key} className="w-full h-full relative">
                    <div className="w-full h-full relative">
                      <i
                        className="absolute right-0 top-0"
                        onClick={() => {
                          removeImage(img[0], img[1]);
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          stroke="#FFFFFF"
                          className="w-6 h-6"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </i>
                      <img
                        src={img[0]}
                        alt=""
                        className=" w-full h-full rounded"
                      />
                    </div>
                  </div>
                ))}

                {preview.length < 4 && (
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
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#ffffff"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                      </svg>
                    </Button>
                  </div>
                )}
              </div>
            )}

            {preview.length == 0 && (
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
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                </Button>
              </div>
            )}
          </div>
        </div>
        <div className="p-3 mx-0 md:mx-auto md:pl-0 md:w-full md:max-w-xl flex flex-col justify-center">
          <div className="px-5 pb-7 md:pl-0">
            <Input
              type="text"
              label="Post Title"
              placeholder="Your title here"
              onChange={(e) => setTitle(e.target.value)}
              defaultValue={postData ? postData.title : ""}
            />

            <Input
              type="text"
              label="Author"
              placeholder="Author of the post"
              onChange={(e) => setAuthor(e.target.value)}
              defaultValue={postData ? postData.author : ""}
            />

            <TextareaInput
              label="Post Description"
              placeholder="What is this post about"
              rows={6}
              onChange={(e) => setDesc(e.target.value)}
              defaultValue={postData ? postData.desc : ""}
            />
            <label className="font-bold font-cormorant text-xl text-gray-600 pb-1 block">
              {" "}
              Tags{" "}
            </label>
            <Select
              closeMenuOnSelect={false}
              isMulti
              options={loadOptions()}
              onInputChange={(keyword) => setSearchKeyword(keyword as string)}
              onChange={onChange}
              value={[...selectedTags]}
            />
            <Button styles="mt-5 w-full text-lg" onClick={handleSubmit}>
              {loading ? <Spinner /> : "Post"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
