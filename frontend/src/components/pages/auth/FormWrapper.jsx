const FormWrapper = ({ subtitle, children }) => {
    return (
        <div className="form-wrapper">
            <img src="./images/get_fluent_logo.svg" alt="logo" height="125" width="125" />
            <h4>{subtitle}</h4>
            {children}
        </div>
    );
};

export default FormWrapper;