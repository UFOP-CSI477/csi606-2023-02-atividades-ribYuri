import "./styles.css";

const TextInput = ({
  className,
  type = "text",
  label,
  placeHolder,
  value,
  errorMessage,
  onChange,
  required,
  readOnly,
  divClassName,
}) => {
  const id = Math.random();
  return (
    <div className={`TextInputContainer ${divClassName}`}>
      <label htmlFor={`${id}`}>{label}</label>
      <input
        type={type}
        className={className}
        id={`${id}`}
        placeholder={placeHolder}
        value={value}
        onChange={onChange}
        disabled={className === "Disable" ? true : false}
        required={required}
        readOnly={readOnly}
      />
      {className === "TextInputError" && errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};

export default TextInput;
