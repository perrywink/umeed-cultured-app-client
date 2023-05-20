import { useState } from "react";

type Props = {
  label: string;
  styles?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  [x: string]: any; // for all button HTML Props
};

const SecretInput = ({ label, styles, onChange, ...rest }: Props) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <>
      <label className="font-bold font-cormorant text-xl text-gray-600 pb-1 block">
        {label}
      </label>
      <div className="relative block">
        <input
          className={`border border-gray-300 rounded-none p-2 mt-2 text-md w-full text-gray-700 font-light outline-gray-300 placeholder:text-gray-400 mb-5 ${styles}`}
          onChange={onChange}
          {...rest}
          type={showPassword ? "text" : "password"}
        />
        <div onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-0 bottom-0 flex"> {/* my-auto should work here but doesnt :( */}
          <div className="self-center">
            <EyeIcon showPassword={showPassword} />
          </div>
        </div>
      </div>
    </>
  );
};

const EyeIcon = ({ showPassword }: { showPassword: boolean }) => {
  return (
    <div className="inline-block h-5 w-5 text-gray-600">
      {showPassword ? (
        <svg
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
          />
        </svg>
      ) : (
        <svg
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
          />
        </svg>
      )}
    </div>
  );
};

export default SecretInput;
