import { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
const ContactSection = () => {
    const [ formData, setFormData ] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });
    const [ errors, setErrors ] = useState({});
    const [ isSubmitting, setIsSubmitting ] = useState(false);
    const [ submissionStatus, setSubmissionStatus ] = useState(null); // 'success' | 'error' | null

    const validateForm = () => {
        let newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = "Name is required";
        }

        if (!formData.phone) {
            newErrors.phone = "Phone number is required";
        } else if (!/^\d{10}$/.test(formData.phone)) {
            newErrors.phone = "Phone number must be exactly 10 digits";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateForm()) return; // ❌ stop submit

        setIsSubmitting(true);
        setSubmissionStatus(null);

        const scriptURL = 'https://script.google.com/macros/s/AKfycbzd2rxWVpxfllnFEwviIkGTZYX5kMg2Z2Var_B5xVySrQF86XIOPuh9L7Cz0bl3R0fClA/exec';

        // Using JSON payload to match the new script's JSON.parse()
        const payload = {
            ...formData,
            website: "Nature's Sign"
        };

        fetch(scriptURL, {
            method: 'POST',
            headers: { 'Content-Type': 'text/plain;charset=utf-8' },
            body: JSON.stringify(payload)
        })
            .then(response => response.json())
            .then(data => {
                setSubmissionStatus('success');
                setFormData({ name: '', email: '', phone: '', message: '' });
            })
            .catch(error => {
                console.error('Error!', error);
                setSubmissionStatus('error');
            })
            .finally(() => {
                setIsSubmitting(false);
            });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Phone: allow ONLY numbers & max 10 digits
        if (name === "phone") {
            if (!/^\d*$/.test(value)) return; // block alphabets
            if (value.length > 10) return;    // max 10 digits
        }

        setFormData({
            ...formData,
            [ name ]: value,
        });

        // clear error while typing
        setErrors({
            ...errors,
            [ name ]: "",
        });
    };

    return (
        <section id="contact" className="relative font-sans">
            {/* 1. Header Title (Outside Background) */}
            <div className="bg-white pt-16 pb-12 text-center">
                <p className="text-[#B96A42] font-bold tracking-[0.2em] text-xs uppercase">
                    CONTACT
                </p>
            </div>

            {/* 2. Hero Background with Overlay Form */}
            <div className="relative w-full h-[850px] lg:h-[700px] bg-gray-800">
                {/* Background Image */}
                <div className="absolute inset-0">
                    <img
                        src="/contact_bg.png"
                        alt="Corporate Building"
                        className="w-full h-full object-cover opacity-60"
                        loading="lazy"
                    />
                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-black/60 mix-blend-multiply" />
                </div>

                {/* Form Card */}
                <div className="absolute inset-0 flex items-center justify-center p-4">
                    <motion.div
                        className="bg-white rounded-3xl shadow-2xl p-8 lg:p-12 w-full max-w-4xl mx-auto"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="md:text-3xl text-xl text-center text-black mb-12 leading-snug">
                            Share query by filling out the form, we will assist you at the earliest.
                        </h1>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Name Input */}
                                <div>
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Your Name*"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full px-6 py-4 bg-[#f2f2f2] rounded-full text-black placeholder-black/60 focus:outline-none focus:ring-1 focus:ring-black"
                                    />
                                    {errors.name && (
                                        <p className="text-red-500 text-sm mt-1 ml-2">{errors.name}</p>
                                    )}
                                </div>

                                {/* Email Input */}
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email*"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-6 py-4 bg-[#f2f2f2] rounded-full text-black placeholder-black/60 focus:outline-none focus:ring-1 focus:ring-black"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Phone Input */}
                                <div>
                                    <input
                                        type="tel"
                                        name="phone"
                                        placeholder="Phone Number *"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full px-6 py-4 bg-[#f2f2f2] rounded-full text-black placeholder-black/60 focus:outline-none focus:ring-1 focus:ring-black"
                                    />
                                    {errors.phone && (
                                        <p className="text-red-500 text-sm mt-1 ml-2">{errors.phone}</p>
                                    )}
                                </div>

                                {/* Dropdown/Textarea */}
                                <textarea
                                    name="message"
                                    placeholder="Your inquiry about..."
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows="1"
                                    className="w-full px-6 py-4 bg-[#f2f2f2] rounded-3xl text-black placeholder-black/60 focus:outline-none focus:ring-1 focus:ring-black resize-none"
                                ></textarea>
                            </div>

                            {/* Footer Text and Button */}
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mt-8">
                                <p className="text-black text-xs font-medium md:text-sm">
                                    Required fields are marked *
                                </p>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`group relative px-8 py-4 ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#FF5A00] hover:bg-[#E04F00]'} text-white w-fit font-semibold rounded-full transition-all duration-300 flex items-center gap-2`}
                                >
                                    {isSubmitting ? 'Sending...' : 'Get A Call Back'}
                                    {!isSubmitting && (
                                        <svg
                                            className="w-5 h-5 transition-transform group-hover:translate-x-1"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    )}
                                </button>

                                {submissionStatus === 'success' && (
                                    <p className="text-green-600 font-medium text-sm md:text-base animate-pulse">
                                        Request sent successfully! We will contact you soon.
                                    </p>
                                )}
                                {submissionStatus === 'error' && (
                                    <p className="text-red-600 font-medium text-sm md:text-base">
                                        Something went wrong. Please try again later.
                                    </p>
                                )}
                            </div>
                        </form>
                    </motion.div>
                </div>
            </div>

            {/* 3. Footer Section */}
            <footer className="bg-[#1C1C1C] text-gray-400 py-12 px-6 relative z-10">
            {/* ✅ WhatsApp Icon exactly on footer edge */}
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
                            <span className="cursor-pointer hover:text-white transition-colors">Disclaimer</span>
                            <span>|</span>
                            <span className="cursor-pointer hover:text-white transition-colors">RERA Disclaimer</span>
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
                            <div className="flex gap-3 text-sm">
                                <a href="#" className="hover:text-white transition-colors"><i className="fab fa-linkedin-in"></i> in</a>
                                <a href="#" className="hover:text-white transition-colors"><i className="fab fa-instagram"></i> ig</a>
                                <a href="#" className="hover:text-white transition-colors"><i className="fab fa-facebook-f"></i> fb</a>
                            </div>
                        </div>
                    </div>
                </div>

            </footer>
            
        </section>
    );
};

export default ContactSection;
