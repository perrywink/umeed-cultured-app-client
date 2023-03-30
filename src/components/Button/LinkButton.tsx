import { ReactNode } from "react";

type Props = {
  handleClick: () => void;
  children: ReactNode;
};

const LinkButton = ({ handleClick, children }: Props) => {
  return (
    <button
      onClick={handleClick}
      className="transition duration-200 px-5 py-4 cursor-pointer font-normal text-lg rounded-lg text-gray-500 hover:text-gray-700 outline-none shadow-none"
    >
      {children}
    </button>
  );
};

export default LinkButton;
