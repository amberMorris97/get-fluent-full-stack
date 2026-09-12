const Input = ({ id, label, type, value, handleChange }) => {
    return (
        <>
            <label htmlFor={id} hidden="hidden">
                {label}
            </label>     
            <input id={id} type={type || 'text'} placeholder={label} value={value} onChange={handleChange} />   
        </>
    );
};

export default Input;