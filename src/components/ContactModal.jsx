import { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useModal } from "../context/ModalContext";
import ContactForm from "./ContactForm";

const ContactModal = () => {
    const { isModalOpen, closeModal, modalProps } = useModal();
    const modalRef = useRef(null);

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                closeModal();
            }
        };

        if (isModalOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ isModalOpen, closeModal ]);

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (isModalOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [ isModalOpen ]);

    // Handle success: Run specific callback (like download) and close modal after delay
    const handleFormSuccess = () => {
        if (modalProps?.onSuccess) {
            modalProps.onSuccess();
        }
        // Delay closing to allow user to see the success message
        setTimeout(() => {
            closeModal();
        }, 2000);
    };

    if (!isModalOpen) return null;

    return (
        <AnimatePresence>
            {isModalOpen && (
                <div className="fixed  inset-0 z-[99999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ duration: 0.3 }}
                        ref={modalRef}
                        className="relative  bg-white rounded-3xl w-full max-w-4xl py-12 px-6 lg:p-12 shadow-2xl max-h-[90vh] overflow-y-auto"
                    >
                        {/* Close Button */}
                        <button
                            onClick={closeModal}
                            className="absolute top-6 right-6 text-gray-500 hover:text-black transition-colors"
                        >
                            <X size={20} />
                        </button>

                        <h1 className="text-base  md:text-3xl  text-center text-black mb-5 ">
                            Share query by filling out the form,<br className="hidden md:block"/> we will assist you at the earliest.
                        </h1>

                        <ContactForm {...modalProps} onSuccess={handleFormSuccess} />
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default ContactModal;
