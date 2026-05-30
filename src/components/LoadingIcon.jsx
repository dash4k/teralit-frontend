const LoadingIcon = () => {
  return (
    <>
      <svg
        className="animate-spin shrink-0"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        aria-hidden="true"
      >
        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
      </svg>
      <p className="text-body-lg font-body-lg">Loading data....</p>
    </>
  );
};

export default LoadingIcon;
