const LinkText = ({ children }) => {
  return <p className="text-on-surface-variant dark:text-inverse-on-surface font-label-md text-label-md hover:text-primary transition-colors cursor-pointer">{children}</p>;
};

export default LinkText;