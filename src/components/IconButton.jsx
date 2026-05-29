const IconButton = ({ children, onClick }) => {
  return (
    <button
      className='text-primary dark:text-inverse-primary pt-2 cursor-pointer'
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default IconButton;
