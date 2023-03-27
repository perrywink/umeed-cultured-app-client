type Props = {
  size: number;
  strokeWidth: number;
  d: string;
};

const Icon = ({size, strokeWidth, d}: Props) => {
  return (
    <svg
      className={`w-${size} h-${size}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
        d={d}
      />
    </svg>
  );
};

export default Icon;
