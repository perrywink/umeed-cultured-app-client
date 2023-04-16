import { useState } from "react";
import { useCreateEContact } from "../../api/user";
import { Input, Button, Spinner } from "../../components";

const EContactOnboard = () => {
  
  const [name, setName] = useState<string>("")
  const [phoneNumber, setPhoneNumber] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)
  const { mutate: registerEContact } = useCreateEContact();


  const handleSubmit = () => {
    registerEContact({
      name: name, 
      phoneNumber: phoneNumber
    })
  }

  return ( 
      <div className="px-5 pb-7">
        <div className="text-center font-cormorant italic text-5xl font-bold text-gray-900">
          A loved one's number
        </div>
        <div className="text-center font-sans text-sm font-light text-gray-600 mt-2 mb-5">
          Who can we contact in a time of need?
        </div>
        <Input
          type="text"
          label="Name"
          onChange={(e) => setName(e.target.value)}
          placeholder="Jane Doe"
        />
        <Input
          type="text"
          label="Contact Number"
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="0412346789"
        />
        <Button
          onClick={handleSubmit}
          styles="mt-5 text-lg"
        >
          {loading ? <Spinner /> : "Next"}
        </Button>
      </div>
  );
}
 
export default EContactOnboard;