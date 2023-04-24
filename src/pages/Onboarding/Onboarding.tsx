import { useEffect, useState } from "react";
import InterestsStep from "./InterestsStep";
import EContactStep from "./EContactStep";
import AllHandsIn from "../../assets/all_hands_in.png";
import {
  useAssignUserTags,
  useCreateEContact,
  useGetUser,
  useUpdateUser,
} from "../../api/user";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Onboarding = () => {
  const [pageNum, setPageNum] = useState<number>(0);

  //input field states are managed here to disguise a single form as 2 pages
  const [name, setName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [selectedTagIds, setSelectedTagIds] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const {
    mutate: registerEContact,
    isSuccess: successEContact
  } = useCreateEContact();
  const {
    mutate: assignUserTags,
    isSuccess: successUserTags
  } = useAssignUserTags();
  const {
    mutate: updateUser,
    isSuccess: onboardSuccess,
  } = useUpdateUser({enabled: successEContact && successUserTags});
  

  const handleSubmit = () => {
    setLoading(true);
    registerEContact({
      name: name,
      phoneNumber: phoneNumber,
    });
    assignUserTags(selectedTagIds);
    updateUser({
      onboarded: true,
    });
  };

  useEffect(() => {
    if (onboardSuccess) {
      toast.success("You're onboarded!");
      navigate('/')
    }
    setLoading(false);
  }, [onboardSuccess]);

  const onboardingSteps = [
    {
      component: (
        <EContactStep
          setPageNum={setPageNum}
          nameState={{ name, setName }}
          phoneNumberState={{ phoneNumber, setPhoneNumber }}
        />
      ),
      label: "Emergency Contact",
    },
    {
      component: (
        <InterestsStep
          handleSubmit={handleSubmit}
          loading={loading}
          selectedTagIdsState={{ selectedTagIds, setSelectedTagIds }}
        />
      ),
      label: "Interests",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 grid md:grid-cols-2">
      <div className="p-10 mx-0 md:mx-auto md:w-full md:max-w-md top-0">
        <nav className="flex">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            {onboardingSteps.map((step, idx) => (
              <li key={idx}>
                <div className="flex items-center">
                  {idx != 0 && (
                    <svg
                      className="w-6 h-6 text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  )}
                  <div
                    onClick={() => setPageNum(idx)}
                    className={`ml-1 text-sm font-medium ${
                      pageNum == idx
                        ? "text-gray-400 cursor-default"
                        : "text-gray-700 hover:text-umeed-tangerine-500 cursor-pointer"
                    } md:ml-2`}
                  >
                    {step.label}
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </nav>
        <div className="h-full md:p-10 p-3 mx-0 md:mx-auto md:w-full md:max-w-md flex flex-col justify-center">
          {onboardingSteps[pageNum].component}
        </div>
      </div>
      <div className="hidden md:block">
        <img
          src={AllHandsIn}
          alt="all hands in"
          className="object-cover w-full h-full"
        />
      </div>
    </div>
  );
};

export default Onboarding;
