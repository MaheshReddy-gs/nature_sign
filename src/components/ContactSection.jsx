import { motion, AnimatePresence } from 'framer-motion';
import { FaWhatsapp, FaArrowLeft } from "react-icons/fa";
import { useState } from 'react';
import ContactForm from './ContactForm';
import FloatUpText from "./Animations/floatUpText";

function DisclaimerModal({ modalContent, setModalContent }) {
  const disclaimers = {
  disclaimer: `
For all intents and purposes, the term “Website” shall refer to all websites and/or microsites under the domain www.shreyasinfra.com, excluding any third-party websites. This Website is the sole and exclusive property of Shreyas Infra.

All content featured on this Website, including but not limited to text, information, graphics, logos, trademarks, software, plans, drawings, layouts, amenities, images, renders, specifications, photographs, and other materials, is owned exclusively by Shreyas Infra and is protected under applicable laws. No part of this Website may be copied, reproduced, published, republished, transmitted, distributed, or otherwise used in any form without prior written consent from Shreyas Infra.

The information and materials provided on this Website are intended solely for general informational and illustrative purposes and do not constitute or create any business, contractual, legal, or employment relationship with Shreyas Infra. While every effort is made to ensure accuracy at the time of publication, Shreyas Infra does not warrant the completeness, timeliness, reliability, or performance of the Website or its contents and shall not be held responsible for any errors, omissions, or inaccuracies.

Shreyas Infra shall not be liable for any loss or damage of any nature whatsoever, including but not limited to direct, indirect, incidental, consequential, special, exemplary, or punitive damages, arising from the use of or reliance upon any information contained on this Website. The suitability, availability, or quality of any products or services referenced herein is not guaranteed.

All warranties, whether express or implied, including but not limited to warranties of merchantability and fitness for a particular purpose, are expressly disclaimed. Shreyas Infra reserves the right, at its sole discretion and without prior notice, to review, modify, update, or remove any content on the Website.

All plans, layouts, amenities, features, specifications, images, renders, and other project-related details are indicative in nature and subject to approvals from the relevant competent authorities. Visual representations, including renders and models, are artistic impressions and should not be construed as representations of actual buildings, apartments, or completed developments.
`,
  rera: `
By using or accessing the Website you agree with the Disclaimer without any qualification or limitation. The Company reserves the right to terminate, revoke, modify, alter, add and delete any one or more of the terms and conditions of the website. The Company shall be under no obligation to notify the visitor of the amendment to the terms and conditions and the visitor shall be bound by such amended terms and conditions.

The imagery used on the website may not represent actuals or may be indicative of style only. Photographs of interiors, surrounding views and location may not represent actuals or may have been digitally enhanced or altered. These photographs may not represent actuals or may be indicative only. Computer generated images, walkthroughs and render images are the artist’s impression and are indicative of the actual designs.

No information given on this Website creates a warranty or expands the scope of any warranty that cannot be disclaimed under the applicable laws. The information on this website is presented as general information and no representation or warranty is expressly or impliedly given as to its accuracy. Any interested party should verify all the information including designs, plans, specifications, facilities, features, payment schedules, terms of sales etc. independently with the Company prior to concluding any decision for buying in any of the project.

While enough care is taken by the Company to ensure that information in the website is up to date, accurate and correct, the readers/users are requested to make an independent enquiry with the Company before relying upon the same. Nothing on the website should be misconstrued as advertising, marketing, booking, selling or an offer for sale or invitation to purchase a unit in any project by the Company. The Company is not responsible for the consequences of any action taken by the viewer relying on such material/information on this website without independently verifying with the Company.
`,
};


  const closeModal = () => setModalContent(null);

  return (
    <AnimatePresence>
      {modalContent && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center  justify-center bg-black/50 p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-lg pt-14 max-w-6xl  w-full h-[90vh] overflow-y-auto p-6 md:p-12  relative"
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

const ContactSection = () => {
  const [modalContent, setModalContent] = useState(null);

  return (
    <section id="contact" className="relative f">
      {/* 1. Header Title (Outside Background) */}
      <div className="bg-white py-14 md:py-0 md:pt-32 pb-12 text-center">
        <FloatUpText className="text-[#a1461a] text-center text-xs tracking-[0.2em] uppercase mb-5">
          Contact
        </FloatUpText>
      </div>

      {/* 2. Hero Background with Overlay Form */}
      <div className="relative w-full h-[850px] lg:h-[650px] bg-gray-800">
        <div className="absolute inset-0">
          <img
            src="/hero_background123.webp"
            alt="Corporate Building"
            className="w-full h-full object-cover opacity-80"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-black/60 mix-blend-multiply" />
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <motion.div
              className="bg-white rounded-3xl shadow-2xl p-8 lg:p-18 w-full max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-base md:text-3xl text-center text-black mb-5">
                Share query by filling out the form,<br className="hidden md:block" />
                we will assist you at the earliest.
              </h1>

              <ContactForm />
            </motion.div>
          </div>
        </div>
      </div>

      {/* 3. Footer Section */}
      <footer className="bg-[#1C1C1C] text-gray-400 py-12 pb-20 px-6 relative z-10">
        <a
          href="https://wa.me/919999999999"
          target="_blank"
          rel="noopener noreferrer"
          className="absolute -top-7 right-10 z-[9999] w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-xl"
        >
          <FaWhatsapp className="text-white text-3xl" />
        </a>

        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end md:items-center gap-8">
          {/* Left Side: Copyright */}
          <div className="text-xs space-y-3 font-light tracking-wide text-gray-500">
            <p>Copyright © 2026 - All Rights Reserved</p>
            <div className="flex gap-2">
              <span
                className="cursor-pointer hover:text-white transition-colors"
                onClick={() => setModalContent('disclaimer')}
              >
                Disclaimer
              </span>
              <span>|</span>
              <span
                className="cursor-pointer hover:text-white transition-colors"
                onClick={() => setModalContent('rera')}
              >
                RERA Disclaimer
              </span>
            </div>
          </div>

          {/* Right Side: Logo & Socials */}
          <div className="flex flex-col items-end gap-4">
            <img
              src="/naturesignlogo.svg"
              alt="Nature's Sign"
              className="h-8 md:h-10 w-auto opacity-80 invert brightness-0 grayscale"
              style={{ filter: "brightness(0) invert(1) opacity(0.6)" }}
            />

            <div className="flex items-center gap-4 text-xs font-medium text-gray-500">
              <span>Follow us on</span>
              <div className="flex gap-3">
                <a
                  href="https://www.linkedin.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <img
                    src="/LinkedIn.svg"
                    className="w-3 h-3 opacity-70 hover:opacity-100 cursor-pointer transition"
                  />
                </a>

                <a
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                >
                  <img
                    src="/insta.svg"
                    className="w-3 h-3 opacity-70 hover:opacity-100 cursor-pointer transition"
                  />
                </a>

                <a
                  href="https://www.facebook.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                >
                  <img
                    src="/facebook.svg"
                    className="w-3 h-3 opacity-70 hover:opacity-100 cursor-pointer transition"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Disclaimer Modal */}
      <DisclaimerModal modalContent={modalContent} setModalContent={setModalContent} />
    </section>
  );
};

export default ContactSection;
