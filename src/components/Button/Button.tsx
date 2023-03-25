import { ReactNode } from "react";

type Props = {
    handleClick : () => void
    children: ReactNode
    isDisabled?: boolean
}

const Button = ({handleClick, children, isDisabled = false}: Props) => {
  const enabledStyles = "transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 hover:shadow-md"

  return (
    <button
      type="button"
      className={`${isDisabled ? "bg-gray-300" : enabledStyles} text-white w-full py-2.5 rounded-lg text-sm shadow-sm font-semibold text-center inline-block`}
      onClick={handleClick}
      disabled={isDisabled}
    >
      <span className="inline-block mr-2">
        {children}
      </span>
    </button>
  );
};

export default Button;
