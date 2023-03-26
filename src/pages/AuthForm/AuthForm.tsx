import { auth } from "../../lib/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useState } from "react";
import { Button, Input } from "../../components";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FirebaseError } from "firebase/app";
import { useNavigate } from "react-router-dom";

type Props = {
  isLogin: boolean;
};

const AuthForm = (props: Props) => {
  const { isLogin } = props;

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleError = (error: FirebaseError) => {
    if(error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') {
      toast.error('Incorrect username or password.');
      return;
    }
    if(error.code === 'auth/invalid-email'){
      toast.error('Please check your email');
      return;
    }
    toast.error('Internal error occured. Please contact support.');
    console.error(error);
  }

  const handleSubmit = () => {
    if (isLogin) {
      signInWithEmailAndPassword(auth, email, password)
        .then(() => navigate('/dashboard'))
        .catch(e => handleError(e))
    } else if (!isLogin && (confirmPassword === password)) {
      createUserWithEmailAndPassword(auth, email, password)
        .then(() => {navigate('/login')})
        .catch(e => handleError(e))
    }
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
            { !isLogin && (
              <Input
                type="password"
                label="Confirm Password"
                handleChange={(e) => setConfirmPassword(e.target.value)}
              />
            )}
            <Button handleClick={handleSubmit}>
              {isLogin ? "Login" : "Register"}
            </Button>
          </div>
        </div>
      </div>
    <ToastContainer />
    </div>
  );
};

export default AuthForm;
