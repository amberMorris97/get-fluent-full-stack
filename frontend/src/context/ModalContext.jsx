import { createContext, useState } from "react";

export const ModalContext = createContext();

export const ModalContextProvider = ({ children }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [modalContent, setModalContent] = useState(null);
    const [modalVariant, setModalVariant] = useState('default');

    const handleOpenModal = (content, title, variant = 'default') => {
        setModalContent(content);
        setModalTitle(title)
        setModalVariant(variant);
        if (!isModalOpen) setIsModalOpen(true);
    };

    const handleCloseModal =  () => {
        if (isModalOpen) setIsModalOpen(false);
    };

    return (
        <ModalContext.Provider value={{ isModalOpen, handleOpenModal, handleCloseModal, modalContent, modalTitle, modalVariant }}>
            {children}
        </ModalContext.Provider>
    );
}