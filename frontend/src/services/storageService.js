export const getTokenFromStorage = () => {
    return localStorage.getItem('token');
}

export const setTokenInStorage = token => {
    localStorage.setItem('token', token);
}

export const removeTokenFromStorage = () => {
    localStorage.removeItem('token');
}

export const getEmailFromStorage = () => {
    return localStorage.getItem('email');
}

export const setEmailInStorage = email => {
    return localStorage.setItem('email', email);
}