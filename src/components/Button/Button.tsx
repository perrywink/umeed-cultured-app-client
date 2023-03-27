import { ReactNode } from "react";
import Spinner from "../Spinner/Spinner";

type Props = {
    handleClick : () => void
    children: ReactNode
    isDisabled?: boolean
    isLoading?: boolean
}

const Button = ({handleClick, children, isDisabled = false, isLoading}: Props) => {
  const enabledStyles = "transition duration-20 bg-umeed-tangerine-500 hover:bg-umeed-tangerine-700 focus:bg-umeed-tangerine-700 focus:shadow-sm focus:ring-4 focus:bg-umeed-tangerine-700 focus:ring-opacity-50 hover:shadow-md"

  return (
    <button
      type="button"
      className={`${isDisabled ? "bg-gray-300" : enabledStyles} text-white w-full py-2.5 rounded-lg text-sm shadow-sm font-semibold text-center inline-block flex items-center justify-center`}
      onClick={handleClick}
      disabled={isDisabled}
    >
      <span className="inline-block mr-2">
        {isLoading ?  <Spinner/> : children}
      </span>
    </button>
  );
};

export default Button;
