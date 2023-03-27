import { auth } from "../../config/firebase";
import {
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { useState } from "react";
import { Button, Icon, Input, LinkButton } from "../../components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FirebaseError } from "firebase/app";
import { useNavigate } from "react-router-dom";
import useFirebaseAuthErrorHandler from "../../hooks/useFirebaseAuthErrorHandler";
import useFormValidator from "../../hooks/useFormValidator";

const Register = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const {handleFirebaseAuthError} = useFirebaseAuthErrorHandler()
  const {checkEmptyFields, checkMatchingFields} = useFormValidator();

  const handleError = (error: FirebaseError) => {
    toast.error(handleFirebaseAuthError(error))
  };

  const validateForm = () => {
    if (!checkEmptyFields([email, password, confirmPassword])) {
      toast.error("All required fields are not filled up.");
      return false;
    }
    if (!checkMatchingFields(password, confirmPassword)) {
      toast.error("Make sure your password match up!");
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
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => handleSuccess())
      .catch((e) => handleError(e))
      .finally(() => setLoading(false));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12">
      <div className="p-10 xs:p-0 mx-0 md:mx-auto md:w-full md:max-w-md">
        <h1 className="font-bold text-center text-2xl mb-5">Cultured UP App</h1>
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
            <Input
              type="password"
              label="Confirm Password"
              handleChange={(e) => setConfirmPassword(e.target.value)}
            />
            <Button handleClick={handleSubmit} isLoading={loading}>
              Register
            </Button>
          </div>
          <div className="py-5">
            <div className="grid grid-cols-2 gap-1">
              <div className="text-left whitespace-nowrap">
                <LinkButton handleClick={() => {}}>
                  <div className="inline-block align-text-bottom">
                    <Icon
                      size={4}
                      strokeWidth={2}
                      d={
                        "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      }
                    />
                  </div>
                  <span className="inline-block ml-1">Forgot Password?</span>
                </LinkButton>
              </div>
              <div className="text-right whitespace-nowrap">
                <LinkButton
                  handleClick={() => {
                    navigate("/login");
                  }}
                >
                  <div className="inline-block align-text-bottom">
                    <Icon
                      size={4}
                      strokeWidth={2}
                      d={
                        "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      }
                    />
                  </div>
                  <span className="inline-block ml-1">Login</span>
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

export default Register;
