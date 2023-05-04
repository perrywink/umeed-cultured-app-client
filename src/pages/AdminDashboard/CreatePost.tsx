import { auth, storage } from "../../config/firebase";
import { Button, Input, Spinner, TextareaInput, FileInput } from "../../components";
import { useEffect, useState } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useCreateMedia, useCreatePost } from "../../api/post";
import { Media, Post } from "../../types/Post";
import { useSearchTags } from "../../api/tag";
import { Tag } from "../../types/Tag";
import Select, { MultiValue } from "react-select";
import React from "react";
import { useFormValidator } from "../../hooks";
import { toast } from "react-toastify";
import {v4 as uuidv4} from 'uuid';


const CreatePost = () => {

    const [mediaUpload, setMediaUpload] = useState<File[]>([]);
    const [imageUrls, setImageUrls] = useState<string>("");
    const [searchKeyword, setSearchKeyword] = useState<string>("");
    const { data, refetch, isLoading } = useSearchTags(searchKeyword);
    const [selectedTagIds, setSelectedTagIds] = useState<number[]>([]);
    const [preview, setPreview] = useState<string[]>([]);
    const [title, setTitle] = useState<string>("");
    const [author, setAuthor] = useState<string>("");
    const [desc, setDesc] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [postId, setPostId] = useState<number>(0);
    const { checkEmptyFields } = useFormValidator();


    const refer = React.useRef<HTMLInputElement>(null);


    const { mutate: createMedia } = useCreateMedia();
    const {mutateAsync: createPost} = useCreatePost();

    

    useEffect(() => {
        refetch();
    }, [searchKeyword]);

    useEffect(() => {
        if (mediaUpload) {
            let array: string[] = [];

            for (let i = 0; i < mediaUpload.length; i++) {
                let url = URL.createObjectURL(mediaUpload[i]);
                array.push(url);
                //URL.revokeObjectURL(objectUrl)
            }
            setPreview(array)

        }

    }, [mediaUpload])

    useEffect(() => {
        if(imageUrls != ""){
            sendMediaData()
        }
    },[imageUrls])


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
        createPost(newPost)
        .then((res) => {
            setPostId(res.data.id)
            uploadFile();
        })
        .finally(() => { setLoading(false)})
    
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
        console.log("sendMediaData",imageUrls);
        console.log("sendMediaData",postId);
        let media: Media = {
            mediaUrl: imageUrls,
            postId: postId,
            isThumbnail: false
        };
        createMedia(media);
    }

    const uploadFile = async() => {

        if (mediaUpload !== undefined && mediaUpload?.length) {
            for (let i = 0; i < mediaUpload?.length; i++) {
                const mediaRef = ref(storage, `${auth.currentUser?.uid}/${mediaUpload[i].name}`+ uuidv4());
                uploadBytes(mediaRef, mediaUpload[i]).then((snapshot) => {
                    getDownloadURL(snapshot.ref).then((url) => {
                        setImageUrls(url);
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


    return (
        <div className="min-h-screen bg-gray-50 grid md:grid-cols-2">
            <div className="md:block justify-center md:py-24 py-10 px-7 h-2/4 md:h-full h-auto">

                <div id="overlay" className="py-3 md:h-full mx-0 md:mx-auto md:w-full md:max-w-xl flex flex-col items-center justify-center rounded-md border-dashed border-2 border-gray-400">
                    {preview.length > 0 && (
                       
                        <div className="grid md:grid-cols-2 grid-cols-1 ">
                            {preview.map((img) => (
                                <img src={img} alt="" className=" px-3 rounded-lg md:object-fill object-center md:w-72 md:h-72 object-contain w-64 h-64" />
                            ))}
                        </div>
                                
                    )}
                    {preview.length ==0 && (
                        <div className="flex flex-col items-center justify-center">
                            <i>
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round"
                                    strokeLinejoin="round"><path d="M21.2 15c.7-1.2 1-2.5.7-3.9-.6-2-2.4-3.5-4.4-3.5h-1.2c-.7-3-3.2-5.2-6.2-5.6-3-.3-5.9 1.3-7.3 4-1.2 2.5-1 6.5.5 8.8m8.7-1.6V21" />
                                    <path d="M16 16l-4-4-4 4" /></svg>
                            </i>
                            <p className="text-sm text-gray-600 ">Browse and choose files from your device</p>
                        </div>
                    )}
                    <FileInput
                        ref={refer}
                        type="file"
                        onChange={selectFiles}
                        hidden
                    />
                    <Button
                        styles="mt-5 w-fit rounded-md"
                        onClick={() => refer.current?.click()}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                    </Button>

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
                        {loading ? <Spinner /> :"Post"}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default CreatePost;