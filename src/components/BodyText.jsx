const BodyText = ({ children, className }) => {
  return <p className={`font-body-md text-body-md text-on-surface-variant dark:text-inverse-on-surface ${className}`}>{children}</p>;
};

export default BodyText;
