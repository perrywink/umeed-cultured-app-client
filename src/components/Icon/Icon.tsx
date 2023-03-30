type Props = {
  styles?: string;
  strokeWidth: number;
  d: string;
};

const Icon = ({styles, strokeWidth, d }: Props) => {
  return (
    <svg
      className={styles}
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
