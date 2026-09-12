import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { requestLogin, requestRegistration } from "../../../services/authService";
import { setEmailInStorage, setTokenInStorage } from "../../../services/storageService";
import FormWrapper from "./FormWrapper";
import { AuthContext } from "../../../context/AuthContext";
import Input from "../../common/forms/inputs/Input";
import InputErrorMessage from "../../common/forms/inputs/InputErrorMessage";
import FormButton from "../../common/forms/inputs/FormButton";

const initialUser = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    verifyPassword: '',
};

const errorMessages = {
    firstNameRequired: "first name is required",
    lastNameRequired: "Last name is required",
    emailRequired: "Email is required",
    passwordLength: "Password must be at least 8 characters long",
    passwordMismatch: "Passwords must be identical.",
}

const RegisterPage = () => {
    const { setAuth } = useContext(AuthContext);

    const [user, setUser] = useState(initialUser);
    const [hasErrors, setHasErrors] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    
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
                navigate('/');
            }
        } catch (error) {
            console.error(error.message);
            // TODO: Give user feedback
        } finally {
            setSubmitting(false);
        }
    };

    const createNewUser = async (newUser) => {
        try {
            let body = {
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                emailAddress: newUser.email,
                password: newUser.password,
            };
            let response = await requestRegistration(body);
            if (response?.status === 201) {
                logInUser(newUser);
            }
        } catch (error) {
            console.error(error.message);
            // TODO: Give user feedback
        }
    };

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.id]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (
            user.firstName === '' ||
            user.lastName === '' ||
            user.email === '' ||
            user.password === '' ||
            user.password.length < 8 ||
            user.password !== user.verifyPassword
        ) {
            setSubmitting(false);
            setHasErrors(true);
        } else {
            setSubmitting(true);
            createNewUser(user);
        }
    }

  const subtitle = "New to Get Fluent Creole? Register here!";
    return (
        <div className="register-page">
            <h2>Join Get Fluent Creole</h2>
            <FormWrapper subtitle={subtitle}>
              <form className="user-register-form">
                <Input
                  id="firstName"
                  label="First Name"
                  value={user.firstName}
                  handleChange={handleChange}
                />
                <InputErrorMessage
                  hasError={hasErrors && user.firstName === ''}
                  msg={errorMessages['firstNameRequired']}
                />
                <Input 
                  id="lastName"
                  label="Last Name"
                  value={user.lastName}
                  handleChange={handleChange}
                />
                <InputErrorMessage 
                  hasError={hasErrors && user.lastName === ''}
                  msg={errorMessages['lastNameRequired']}
                />
                <Input 
                  id="email"
                  label="Email Address"
                  value={user.email}
                  handleChange={handleChange}
                />
                <InputErrorMessage 
                  hasError={hasErrors && user.email === ''}
                  msg={errorMessages['emailRequired']}
                />
                <Input 
                  id="password"
                  label="Enter a password"
                  type="password"
                  value={user.password}
                  handleChange={handleChange}
                />
                <InputErrorMessage 
                  hasError={hasErrors && user.password.length < 8}
                  msg={errorMessages['passwordLength']}
                />
                <Input 
                  id="verifyPassword"
                  label="Verify password"
                  type="password"
                  value={user.verifyPassword}
                  handleChange={handleChange}
                />
                <InputErrorMessage 
                  hasError={hasErrors && user.verifyPassword !== user.password}
                  msg={errorMessages['passwordMismatch']}
                />
                <FormButton
                  id="sign-up"
                  type="submit"
                  label="Sign Up"
                  classes="btn"
                  handleClick={handleSubmit}
                />
              </form>
            </FormWrapper>
        </div>
    );
};

export default RegisterPage;