import { auth, storage } from "../../config/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components";
import { useEffect, useState } from "react";
import {
    ref,
    uploadBytes,
    getDownloadURL,
    listAll,
    list,
} from "firebase/storage";

const CreatePost = () => {
    const navigate = useNavigate();

    const [mediaUpload, setMediaUpload] = useState<Blob>();
    const [mediaUrl, setMediaUrls] = useState<string[]>([])

    const mediaListRef = ref(storage, `${auth.currentUser?.uid}/`);
    const uploadFile = () => {
        if (mediaUpload !== undefined) {
            const mediaRef = ref(storage, `${auth.currentUser?.uid}/${mediaUpload.name}`);
            uploadBytes(mediaRef, mediaUpload).then((snapshot) => {
                getDownloadURL(snapshot.ref).then((url) => {
                    setMediaUrls((prev) => [...prev, url]);
                });
            });
        };
    };

    useEffect(() => {
        listAll(mediaListRef).then((response) => {
            response.items.forEach((item) => {
                getDownloadURL(item).then((url) => {
                    setMediaUrls((prev) => [...prev, url]);
                });
            });
        });
    }, []);


    return (
        <div className='min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12'>
            <div className='p-10 xs:p-0 mx-auto md:w-full md:max-w-md'>
                <div className='px-5 py-7'>
                    Upload files
                </div>
                <Button onClick={uploadFile}>Upload</Button>
            </div>
        </div>
    );
};

export default CreatePost;