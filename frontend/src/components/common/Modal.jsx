import { useContext, useEffect, useRef } from 'react';
import { ModalContext } from '../../context/ModalContext';

import IconButton from './IconButton';

const VARIANT_CONFIG = { 
    CORRECT: { icon: 'fa-check', className: 'modal-correct' },
    WRONG: { icon: 'fa-xmark', className: 'modal-wrong' },
    INFO: { icon: 'fa-info', className: 'info-modal'},
};

const Modal = () => {
    const modalRef = useRef(null);
    const buttonRef = useRef();
    const { isModalOpen, handleCloseModal, modalContent, modalTitle } = useContext(ModalContext);
    
    useEffect(() => {
        buttonRef.current.focus();
    }, []);

    const variantConfig = VARIANT_CONFIG[modalTitle];

    useEffect(() => {
        if (isModalOpen) {
            modalRef.current?.showModal();
        } else {
            modalRef.current?.close();
        }
    }, [isModalOpen]);

    return (
        <dialog ref={modalRef} onCancel={handleCloseModal} closedby="any">
            <div className={`modal ${variantConfig ? variantConfig.className : ''}`}>
                <div className='modal-top-bar'>
                    <IconButton
                        id='close-modal'
                        ref={buttonRef}
                        ariaLabel='Close'
                        handleClick={handleCloseModal}>
                        <i className='fa-solid fa-xmark close-modal-icon'></i>   
                    </IconButton>
                </div>

                {variantConfig && (
                    <div className="modal-status-icon">
                        <i className={`fa-solid ${variantConfig.icon}`}></i>
                    </div>
                )}

                {modalTitle !== 'INFO' && <h3>{modalTitle === 'CORRECT' ? 'Correct!' : modalTitle === 'WRONG' ? 'WRONG' : modalTitle}</h3>}
                <div className='modal-body'>
                    {modalContent}
                </div>
            </div>
        </dialog>
    );
};

export default Modal;