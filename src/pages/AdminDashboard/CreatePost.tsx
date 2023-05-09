import { auth, storage } from "../../config/firebase";
import { Button, Input, Spinner, TextareaInput, FileInput, AdminNav } from "../../components";
import { useEffect, useState } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useAssignPostTags, useCreateMedia, useCreatePost } from "../../api/post";
import { Media, Post } from "../../types/Post";
import { useSearchTags } from "../../api/tag";
import { Tag } from "../../types/Tag";
import Select, { MultiValue } from "react-select";
import React from "react";
import { useFormValidator } from "../../hooks";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from 'uuid';


const CreatePost = () => {

    const [mediaUpload, setMediaUpload] = useState<File[]>([]);
    const [imageUrls, setImageUrls] = useState<[string, boolean]>(["", false]);
    const [searchKeyword, setSearchKeyword] = useState<string>("");
    const { data, refetch, isLoading } = useSearchTags(searchKeyword);
    const [selectedTagIds, setSelectedTagIds] = useState<number[]>([]);
    const [preview, setPreview] = useState<[string, string, string][]>([]);
    const [title, setTitle] = useState<string>("");
    const [author, setAuthor] = useState<string>("");
    const [desc, setDesc] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [postId, setPostId] = useState<number>(0);
    const { checkEmptyFields } = useFormValidator();


    const refer = React.useRef<HTMLInputElement>(null);


    const { mutate: createMedia } = useCreateMedia();
    const { mutateAsync: createPost } = useCreatePost();
    const { mutate: assignPostTags } = useAssignPostTags();



    useEffect(() => {
        refetch();
    }, [searchKeyword]);

    // useEffect(() => {
    //     if (postSuccess) {
    //         const postTags = {
    //             tagIds: selectedTagIds,
    //             postId: postId
    //         }
    //         assignPostTags(postTags)
    //     }

    // }, [postId])

    useEffect(() => {
        if (mediaUpload) {
            let array: [string, string, string][] = [];

            for (let i = 0; i < mediaUpload.length; i++) {
                let url = URL.createObjectURL(mediaUpload[i]);
                array.push([url, mediaUpload[i].name, mediaUpload[i].type]);
                //URL.revokeObjectURL(objectUrl)
            }
            setPreview(array);
            console.log("preview", preview);
        }

    }, [mediaUpload])

    useEffect(() => {
        if (imageUrls[0] != "") {
            sendMediaData()
        }
    }, [imageUrls])


    const validateForm = () => {
        if (!checkEmptyFields([title, author, desc]) || mediaUpload.length == 0) {
            toast.error("All required fields are not filled up.");
            return false;
        }
        return true;
    };


    const handleSubmit = () => {
        if (!validateForm()) return;
        setLoading(true);

        const newPost: Post = {
            title: title,
            author: author,
            desc: desc,
            status: "APPROVED"
        }
        try {
            createPost(newPost)
                .then((res) => {
                    setPostId(res.data.id);
                    assignPostTags({ tagIds: selectedTagIds, postId: res.data.id });
                    uploadFile();
                })
                .finally(() => { setLoading(false) })
        } catch (err) {
            console.log(err);
        }

    }

    const loadOptions = () => {
        if (!isLoading && data) {
            const tags = data as Tag[];
            return tags.map((tag) => ({
                value: tag.id,
                label: tag.name,
            }));
        }
    };

    const onChange = (selectedOptions: MultiValue<{
        value: number;
    }>) => {
        setSelectedTagIds(selectedOptions.map(option => {
            return option.value
        }))
    }

    const sendMediaData = () => {
        console.log("sendMediaData", imageUrls);
        console.log("sendMediaData", postId);
        let media: Media = {
            mediaUrl: imageUrls[0],
            postId: postId,
            isThumbnail: imageUrls[1]
        };
        createMedia(media);
    }

    const uploadFile = async () => {

        if (mediaUpload !== undefined && mediaUpload?.length) {
            for (let i = 0; i < mediaUpload?.length; i++) {
                const mediaRef = ref(storage, `${auth.currentUser?.uid}/${mediaUpload[i].name}` + uuidv4());
                uploadBytes(mediaRef, mediaUpload[i]).then((snapshot) => {
                    getDownloadURL(snapshot.ref).then((url) => {
                        if (i == 0) {
                            setImageUrls([url, true]);
                        } else {
                            setImageUrls([url, false]);
                        }

                    });
                });
            }
        };
    };

    const selectFiles = ({ currentTarget: { files }, }: React.ChangeEvent<HTMLInputElement>) => {
        if (files && files.length) {
            setMediaUpload(existing => [...existing, ...files]);

        }

    }

    const removeImage = (url: string, filename: string) => {
        setPreview(preview.filter(x => x[0] !== url));
        setMediaUpload(mediaUpload.filter(x => x.name !== filename));

    }


    return (
        <div className="bg-gray-50">
            <AdminNav location="/admin/post"></AdminNav>
            {/* <div className="text-center font-cormorant text-5xl font-bold text-umeed-blue">
                New Post
            </div> */}
            <div className="min-h-screen  grid md:grid-cols-2">

                <div className="md:block justify-center md:py-24 py-10 px-7 h-2/4 md:h-full h-auto">

                    <div id="overlay" className="py-3 md:h-full mx-0 md:mx-auto md:w-full md:max-w-xl flex flex-col items-center justify-center rounded-md border-dashed border-2 border-gray-400">

                        {preview.length == 0 && (
                            <div className="flex flex-col items-center justify-center">
                                <i>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                        strokeLinejoin="round"><path d="M21.2 15c.7-1.2 1-2.5.7-3.9-.6-2-2.4-3.5-4.4-3.5h-1.2c-.7-3-3.2-5.2-6.2-5.6-3-.3-5.9 1.3-7.3 4-1.2 2.5-1 6.5.5 8.8m8.7-1.6V21" />
                                        <path d="M16 16l-4-4-4 4" /></svg>
                                </i>
                                <p className="text-md text-gray-600 font-light">Browse and choose files from your device</p>
                            </div>
                        )}

                        {preview.length > 0 && (

                            <div className="grid grid-cols-2 p-5 gap-2 place-items-center">
                                {preview.map((img, key) => (
                                    <div key={key} className="w-full h-full relative">

                                        <div className="w-full h-full relative">
                                            <i className="absolute right-0 top-0" onClick={() => { removeImage(img[0], img[1]) }}>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" stroke="#FFFFFF" className="w-6 h-6">
                                                    <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
                                                </svg>
                                            </i>
                                            <img src={img[0]} alt="" className=" w-full h-full rounded" />
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
                                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
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
                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
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
                        />

                        <Input
                            type="text"
                            label="Author"
                            placeholder="Author of the post"
                            onChange={(e) => setAuthor(e.target.value)}
                        />

                        <TextareaInput
                            label="Post Description"
                            placeholder="What is this post about"
                            rows={6}
                            onChange={(e) => setDesc(e.target.value)}
                        />
                        <label className="font-bold font-cormorant text-xl text-gray-600 pb-1 block"> Tags </label>
                        <Select
                            closeMenuOnSelect={false}
                            isMulti
                            options={loadOptions()}
                            onInputChange={(keyword) => setSearchKeyword(keyword as string)}
                            onChange={onChange}
                        />
                        <Button
                            styles="mt-5 w-full text-lg"
                            onClick={handleSubmit}
                        >
                            {loading ? <Spinner /> : "Post"}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreatePost;