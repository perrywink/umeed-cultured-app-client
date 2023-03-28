type Props = {
  size: number;
  styles?: string;
  strokeWidth: number;
  d: string;
};

const Icon = ({ size, styles, strokeWidth, d }: Props) => {
  return (
    // <svg
    //   xmlns="http://www.w3.org/2000/svg"
    //   className={`h-${size} w-${size} ${styles}`}
    //   fill="none"
    //   viewBox={`0 0 ${size} ${size}`}
    //   stroke="currentColor"
    // >
    //   <path
    //     strokeLinecap="round"
    //     strokeLinejoin="round"
    //     strokeWidth={strokeWidth}
    //     d={d}
    //   />
    // </svg>
    <svg
      className={`h-${size} w-${size} text-gray-500 ${styles}`}
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
