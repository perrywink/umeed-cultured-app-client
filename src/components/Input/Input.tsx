type Props = {
  label: string,
  handleChange: React.ChangeEventHandler<HTMLInputElement> | undefined,
  type: string
  isDisabled?: boolean
};

const Input = ({label, handleChange, type, isDisabled = false}: Props) => {
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
