const Input = ({ id, type, value, setValue, label, placeholder, disabled=false }) => {
  return (
    <div className="flex flex-col gap-xs text-on-surface-variant dark:text-inverse-on-surface">
      <label
        htmlFor={id}
        className="font-label-bold text-label-bold"
      >
        {label}
      </label>
      <input
        disabled={disabled}
        type={type}
        value={value}
        onChange={setValue}
        placeholder={placeholder}
        className="font-body-lg text-body-lg px-1 py-2 border border-outline rounded-md"
      />
    </div>
  );
};

export default Input;
