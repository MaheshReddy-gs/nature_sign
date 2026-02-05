import { createContext, useState, useContext } from 'react';

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
    const [ isModalOpen, setIsModalOpen ] = useState(false);
    const [ modalProps, setModalProps ] = useState({});

    const openModal = (props = {}) => {
        setModalProps(props);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        // Optional: clear props after a timeout or immediately if desired, 
        // but simple toggle is usually fine. 
        setTimeout(() => setModalProps({}), 300);
    };

    return (
        <ModalContext.Provider value={{ isModalOpen, openModal, closeModal, modalProps }}>
            {children}
        </ModalContext.Provider>
    );
};

export const useModal = () => {
    return useContext(ModalContext);
};
