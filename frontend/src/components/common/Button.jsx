const Button = ({ label, onClick, className = '', disabled = false }) => {
    return (
        <button className={`btn ${className}`} onClick={onClick} disabled={disabled} >
            {label}
        </button>
    );
};

export default Button;