import { auth, storage } from "../../config/firebase";
import { Button } from "../../components";
import {useState } from "react";
import {getDownloadURL, ref,uploadBytes} from "firebase/storage";
import { toast } from "react-toastify";
import { useCreateMedia } from "../../api/post";
import { Media, Post } from "../../types/Post";

const CreatePost = () => {

    const [mediaUpload, setMediaUpload] = useState<FileList | null>();
    const [imageUrls, setImageUrls] = useState<string[]>([]);

    const {mutate: createMedia} = useCreateMedia();


    const handleSuccess = (mediaUrl:string) => {
       
    }

    const uploadFile = () => {
    
        if (mediaUpload !== undefined && mediaUpload?.length) {
            for (let i = 0; i < mediaUpload?.length; i++) {
                const mediaRef = ref(storage, `${auth.currentUser?.uid}/${mediaUpload[i].name}`);
                uploadBytes(mediaRef, mediaUpload[i]).then((snapshot) => {
                getDownloadURL(snapshot.ref).then((url) => {
                  setImageUrls((prev) => [...prev, url]);
                  console.log(imageUrls);
                });
            });
            
            }
            
        };
    };


    return (
        <div className='min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12'>
            <div className='p-10 xs:p-0 mx-auto md:w-full md:max-w-md'>

                <input
                    type="file"
                    multiple
                    onChange={(e) => { setMediaUpload(e.target.files) }}
                />
                <Button onClick={uploadFile} >Upload</Button>
            </div>
        </div>
    );
};

export default CreatePost;