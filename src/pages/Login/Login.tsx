import { auth } from "../../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Button, Icon, Input, LinkButton } from "../../components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FirebaseError } from "firebase/app";
import { useNavigate } from "react-router-dom";
import useFirebaseAuthErrorHandler from "../../hooks/useFirebaseAuthErrorHandler";
import useFormValidator from "../../hooks/useFormValidator";
import { createAuthToken } from "../../api/auth";
import { encryptData } from "../../utils/crypto";

const AuthForm = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { handleFirebaseAuthError } = useFirebaseAuthErrorHandler();
  const { checkEmptyFields } = useFormValidator();

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

  const handleSuccess = (username: string) => {
    createAuthToken(username)
    .then( response => {
      const token = encryptData(response.data.token,import.meta.env.VITE_SALT);
      localStorage.setItem("token", token);
      navigate("/dashboard");
      toast.success("You're logged in!");
    })
    .catch((e) => console.log(e));
  };

  const handleSubmit = () => {
    if (!validateForm()) return;
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then(() => handleSuccess(email))
      .catch((e) => handleError(e))
      .finally(() => setLoading(false));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12">
      <div className="md:p-10 p-3 mx-0 md:mx-auto md:w-full md:max-w-md">
        <h1 className="font-cormorant text-center text-4xl mb-10">
          Cultured UP App
        </h1>
        <div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
          <div className="px-5 py-7">
            <Input
              type="text"
              label="Email"
              handleChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              label="Password"
              handleChange={(e) => setPassword(e.target.value)}
            />
            <Button handleClick={handleSubmit} isLoading={loading}>
              Login
            </Button>
          </div>
          <div className="py-5">
            <div className="grid grid-cols-2 gap-1">
              <div className="text-left whitespace-nowrap">
                <LinkButton handleClick={() => {}}>
                  <Icon
                    strokeWidth={2}
                    styles="w-5 h-5 text-gray-500 inline-block align-text-top"
                    d={
                      "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    }
                  />
                  <span className="inline-block ml-1">Forgot Password</span>
                </LinkButton>
              </div>
              <div className="text-right whitespace-nowrap">
                <LinkButton
                  handleClick={() => {
                    navigate("/register");
                  }}
                >
                  <Icon
                    strokeWidth={2}
                    styles="w-5 h-5 text-gray-500 inline-block align-text-top"
                    d={
                      "M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                    }
                  />
                  <span className="inline-block ml-1">Register</span>
                </LinkButton>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AuthForm;
