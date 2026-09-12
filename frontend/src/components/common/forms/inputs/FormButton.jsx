const FormButton = ({ id, type, label, classes, handleClick, disabled = false}) => {
  return (
    <button id={`${id}-button`} type={type} onClick={handleClick} className={classes} disabled={disabled}>
        {label}
    </button>
  );
};

export default FormButton;