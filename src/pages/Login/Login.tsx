import { auth } from "../../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Button, Icon, Input, LinkButton, SecretInput, Spinner } from "../../components";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FirebaseError } from "firebase/app";
import { useNavigate } from "react-router-dom";
import { useFirebaseAuthErrorHandler, useFormValidator } from "../../hooks";
import CheckboxInput from "../../components/Input/CheckboxInput";
import AllHandsIn from '../../assets/all_hands_in.png'

const AuthForm = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { handleFirebaseAuthError } = useFirebaseAuthErrorHandler();
  const { checkEmptyFields, checkMatchingFields } = useFormValidator();

  const handleError = (error: FirebaseError) => {
    toast.error(handleFirebaseAuthError(error));
  };

  const validateForm = () => {
    if (!checkEmptyFields([email, password])) {
      toast.error("All required fields are not filled up.");
      return false;
    }
    return true;
  };

  const handleSuccess = () => {
    navigate("/dashboard");
    toast.success("You're logged in!");
  };

  const handleSubmit = () => {
    if (!validateForm()) return;
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then(() => handleSuccess())
      .catch((e) => handleError(e))
      .finally(() => setLoading(false));
  };

  return (
    <div className="min-h-screen bg-gray-50 grid md:grid-cols-2">
      <div className="md:p-10 p-3 mx-0 md:mx-auto md:w-full md:max-w-md flex flex-col justify-center">
        <div className="px-5 py-7">
          <div className="text-center font-cormorant italic text-5xl font-bold text-gray-900">
            Hi Again!
          </div>
          <div className="text-center font-sans text-md font-light text-gray-600 mt-2 mb-5">
            Put in your details to continue.
          </div>
          <Input
            type="text"
            label="Email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="john@doe.com"
          />
          <SecretInput
            label="Password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Minimum 6 characters."
          />
          <div className="grid grid-cols-2 gap-1 mb-5">
            <div className="text-left whitespace-nowrap">
              <CheckboxInput label="Remember me"/>
            </div>
            <LinkButton onClick={() => {}}>Forgot Password?</LinkButton>
          </div>
          <Button
            onClick={handleSubmit}
            styles="mt-5 text-lg"
          >
            {loading ? <Spinner /> : "Login"}
          </Button>
        </div>
        <div className="text-center font-cormorant text-md text-gray-900 mt-5">
          Don't have an account? <span className="font-bold hover:underline cursor-pointer" onClick={() => navigate("/register")}>Register now</span>
        </div>
      </div>
      <div className="bg-umeed-tangerine-300 hidden md:block">
        <img src={AllHandsIn} alt="all hands in" className="object-cover w-full h-full opacity-80"/>
      </div>
    </div>
  );
};

export default AuthForm;
