const validateForm = ({ name, email, phrase, translation }) => {
    const errors = {};
    let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!name) errors.name = "Name is required.";

    if (!phrase) errors.phrase = "Phrase is required";

    if (!translation) errors.translation = "Translation is required";

    if (!email) {
        errors.email = "Email is required";
     } else if (!emailRegex.test(email)) {
        errors.email = "Please enter a valid email.";
     }

     return errors;
};

export default validateForm;