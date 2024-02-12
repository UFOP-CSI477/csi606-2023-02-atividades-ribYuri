import "./styles.scss";

const TextInput = ({
  className,
  type = "text",
  placeHolder,
  value,
  errorMessage,
  onChange,
  required,
  readOnly,
}) => {
  const id = Math.random();
  return (
    <div className="TextInputContainer">
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
