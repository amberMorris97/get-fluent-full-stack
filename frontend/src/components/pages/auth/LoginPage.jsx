import { useContext, useState } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import Input from '../../common/forms/inputs/Input';
import InputErrorMessage from '../../common/forms/inputs/InputErrorMessage';
import FormWrapper from './FormWrapper';
import { Link, useNavigate } from 'react-router';
import FormButton from '../../common/forms/inputs/FormButton';
import { requestLogin } from '../../../services/authService';
import { setEmailInStorage, setTokenInStorage } from '../../../services/storageService';

const initialUser = {
    email: '',
    password: '',
};

const errorMessages = {
    emailRequired: "Email is required.",
    passwordRequired: "Password is required.",
    emailOrPasswordIncorrect: "Email or password was incorrect.",
    genericError: 'There was an error logging you in.',
};

const LoginPage = ({ notify }) => {
    const { setAuth } = useContext(AuthContext);
    const [user, setUser] = useState(initialUser);
    const [hasErrors, setHasErrors] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [apiError, setApiError] = useState('');

    const navigate = useNavigate();

    const logInUser = async (user) => {
        try {
            let body = { emailAddress: user.email, password: user.password };
            let response = await requestLogin(body);
            if (response?.status === 200) {
                let token = response.data.token;
                setEmailInStorage(user.email);
                setTokenInStorage(token);
                setAuth({ token, email: user.email, isAuthenticated: true });
                notify(true, "Success logging you in.");
                navigate('/');
            }
        } catch (error) {
            setHasErrors(true);
            if (error.response && error.response.status === 401) {
                setApiError(errorMessages['emailOrPasswordIncorrect']);
            } else {
                setApiError(errorMessages['genericError']);
            } 
            notify(false, "There was an error logging you in.");
        } finally {
            setSubmitting(false);
        }
    }

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.id]: e.target.value,
        });
    };

     const handleSubmit = (e) => {
        e.preventDefault();

        if (user.email === '' || user.password === '') {
            notify(false);
            setSubmitting(false);
            setHasErrors(true);
        } else {
            setSubmitting(true);
            logInUser(user);
        }
     };

    const subtitle = "Welcome back!";
    return (
        <div className="login-page">
            <h2>Log In</h2>
            <FormWrapper className="form-wrapper" subtitle={subtitle}>
                <form className="user-login-form" onSubmit={handleSubmit}>
                    <Input 
                      id="email"
                      label="Email"
                      value={user.email}
                      handleChange={handleChange}
                    />
                    <InputErrorMessage
                        hasError={hasErrors && user.email === ''}
                        msg={errorMessages['emailRequired']}
                    />
                    <Input 
                      id="password"
                      label="Password"
                      type="password"
                      value={user.password}
                      handleChange={handleChange}
                    />
                    <InputErrorMessage 
                        hasError={hasErrors && user.password === ''}
                        msg={errorMessages['passwordRequired']}
                    />
                    <FormButton 
                      id="log-in"
                      type="submit"
                      label="Log In"
                      classes="btn"
                      handleClick={handleSubmit}
                      disabled={submitting}
                    />
                    <InputErrorMessage
                      hasError={hasErrors && apiError.length > 0}
                      msg={apiError}
                    />
                </form>
                <span className="auth-reroute-text">Need an account? Sign up <Link to="/register">here</Link>.</span>
            </FormWrapper>
        </div>
    );
}

export default LoginPage;