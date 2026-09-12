import { createPortal } from 'react-dom';
import Button from './Button';

const Modal = ({ open, children, onClose, className = ''}) => {
    if (!open) return null;

    return createPortal(
        <>
            <div className="modal-overlay">
                <div className={`modal-content ${className}`}>
                    <Button label="Get Fluent" className="close-modal-btn" onClick={onClose} />
                    {children}
                </div>
            </div>
        </>,
        document.getElementById('portal')
    )
}

export default Modal;