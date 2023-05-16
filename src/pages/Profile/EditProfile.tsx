import { useEffect, useState } from "react";
import { Button, Input, SecretInput, Spinner } from "../../components";
import { ArrowUturnLeftIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import { useCreateEContact, useGetUser, useGetUserEContact, useUpdateUser } from "../../api/user";
import { toast } from "react-toastify";
import { auth } from "../../config/firebase";

const EditProfile = () => {
  const { data: userData, isSuccess: successUserData } = useGetUser();
  const { data: getEContact, isSuccess: getEContactSuccess } = useGetUserEContact();

  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [contact, setContact] = useState<string>("");
  const [eContactName, setEContactName] = useState<string>("");
  const [eContact, setEContact] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();
  
  const { mutateAsync: updateUser, isSuccess: updateUserSuccess } = useUpdateUser();
  const { mutateAsync: upsertEContact, isSuccess: upsertEContactSuccess } = useCreateEContact();

  useEffect(() => {
    if (successUserData && !!userData) {
      setEmail(userData.email)
      setUsername(userData.username)
      setContact(userData.contact)
    }
  }, [successUserData])

  useEffect(() => {
    console.log(getEContact)
    if (getEContactSuccess && !!getEContact) {
      setEContactName(getEContact?.name)
      setEContact(getEContact?.phoneNumber)
    }
  })

  const checkUserChanged = () => {
    if (email !== userData?.email) return true
    if (username !== userData?.username) return true
    if (contact !== userData?.contact) return true
    return false
  }

  const checkEContactChanged = () => {
    if (eContact !== getEContact?.phoneNumber) return true
    if (eContactName !== getEContact?.name) return true
    return false
  }

  const handleSubmit = async () => {
    try{
      if (checkUserChanged()){
        await updateUser({email, contact, username})
        toast.success("User succesfully updated")
      }
      if (checkEContactChanged()) {
        await upsertEContact({name: eContactName, phoneNumber: eContact})
        toast.success("Emergency Contact succesfully updated")
      }
      if (!checkUserChanged() && !checkEContactChanged()) {
        toast.info("No information was modified!")
      }
    } catch (error) {
      toast.error(error as any)
      console.error(error)
    }
  };

  return (
    <div className="flex flex-col flex-grow mt-6">
      <div className="flex items-center justify-center w-full hover:text-umeed-tangerine-500 cursor-pointer" onClick={() => navigate("/profile")}>
        <ArrowUturnLeftIcon className="w-5 h-5" />
        <div className="text-sm pl-3">Back to Profile</div>
      </div>
      <div className="bg-white justify-center">
        <div className="md:p-10 p-3 mx-0 md:mx-auto md:w-full md:max-w-lg flex flex-col justify-center">
          <div className="px-10 py-7">
            <div className="text-center font-cormorant italic text-5xl font-bold text-gray-900">
              Edit Profile
            </div>
            <div className="text-center font-sans text-sm font-light text-gray-600 mt-2 mb-5">
              Once you are happy with your changes, click on save!
            </div>
            <Input
              type="text"
              label="Email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="john@doe.com"
              value={email}
            />
            <Input
              type="text"
              label="Username"
              onChange={(e) => setUsername(e.target.value)}
              placeholder="john doe"
              value={username}
            />
            <Input
              type="text"
              label="Contact Number"
              onChange={(e) => setContact(e.target.value)}
              placeholder="0412346789"
              value={contact}
            />
            <Input
              type="text"
              label="Emergency Contact Name"
              onChange={(e) => setEContactName(e.target.value)}
              placeholder="Jane Doe"
              value={eContactName}
            />
            <Input
              type="text"
              label="Emergency Contact Number"
              onChange={(e) => setEContact(e.target.value)}
              placeholder="0412346789"
              value={eContact}
            />
            <Button onClick={handleSubmit} styles="mt-5 text-lg w-full">
              {loading ? <Spinner /> : "Save"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
