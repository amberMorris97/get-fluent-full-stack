import { useState } from 'react';
import validateForm from '../../utils/validateForm';
import Modal from './Modal';

const ContactForm = () => {
    const [isOpen, setIsOpen] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phrase: '',
        translation: '',
    });

    const [formErrors, setFormErrors] = useState({});

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

        /** remove errors from fields being edited */
        setFormErrors({
            ...formErrors,
            [e.target.name]: ''
        });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        
        const errors = validateForm(formData);

        const errArr = Object.keys(errors);
        
        /** if errors exist in the form, cancel the submit action */
        if (errArr.length > 0) {
            setFormErrors(errors);
            return;
        }

        setFormData({
            name: '',
            email: '',
            phrase: '',
            translation: '',
        });
            
        /** Notify the user form was submitted */
        setIsOpen(true);
    };

  return (
    <div className="form-container">
        <h2>Submit a phrase!</h2>
        <form className="contact-form" onSubmit={handleFormSubmit}>
            <>
                <label>
                    Name: 
                    <input id="name" name="name" value={formData.name} onChange={handleInputChange} />
                    <span>{formErrors.name}</span>
                </label>
            </>
            <>
                <label>
                    Email:
                    <input id="email" name="email" value={formData.email} onChange={handleInputChange} />
                    <span>{formErrors.email}</span>
                </label>
            </>
            <>
                <label>
                    Phrase:
                    <textarea id="phrase" name="phrase" value={formData.phrase} onChange={handleInputChange} />
                    <span>{formErrors.phrase}</span>
                </label>
            </>
            <>
                <label>
                    Translation:
                    <textarea id="translation" name="translation" value={formData.translation} onChange={handleInputChange} />
                    <span>{formErrors.translation}</span>
                </label>
            </>
            <Modal className="flashcard-popup" open={isOpen} onClose={() => setIsOpen(false)}>
                <span>Thank you for submitting!</span>
            </Modal>
            <button className="btn" type="submit">Submit Phrase</button>
        </form>
    </div>
  );
};

export default ContactForm;