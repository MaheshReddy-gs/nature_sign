export default function DisclaimerModal({ modalContent, setModalContent }) {
  const disclaimers = {
    disclaimer: `
For all intents and purposes, the term “Website” shall refer to all websites ...
`,
    rera: `
By using or accessing the Website you agree with the Disclaimer ...
`,
  };

  const closeModal = () => setModalContent(null);

  return (
    <AnimatePresence>
      {modalContent && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-12 text-gray-800 relative"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Back Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 left-4 flex items-center gap-2 text-[#a1461a] font-medium hover:text-[#922f0f] transition"
            >
              <FaArrowLeft /> Back
            </button>

            {/* Heading */}
            <h2 className="section-heading mb-6 text-center">
              {modalContent === 'disclaimer' ? 'Disclaimer' : 'RERA Disclaimer'}
            </h2>

            {/* Content */}
            <div className="text-base leading-relaxed whitespace-pre-line">
              {modalContent ? disclaimers[modalContent] : ''}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
