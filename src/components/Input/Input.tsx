type Props = {
  type: string;
  label: string;
  handleChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
  isDisabled?: boolean;
  isRequired?: boolean;
};

const Input = ({ label, handleChange, isDisabled = false, type }: Props) => {
  return (
    <>
      <label className="font-semibold text-sm text-gray-600 pb-1 block">
        {label}
      </label>
      <input
        type={type}
        className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
        onChange={handleChange}
        disabled={isDisabled}
      />
    </>
  );
};

export default Input;
