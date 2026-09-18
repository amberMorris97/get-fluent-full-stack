const Input = ({ id, label, type, value, handleChange, classes = "" }) => {
    return (
        <>
            <label htmlFor={id} hidden="hidden">
                {label}
            </label>     
            <input id={id} type={type || 'text'} placeholder={label} value={value} onChange={handleChange} className={classes} />   
        </>
    );
};

export default Input;