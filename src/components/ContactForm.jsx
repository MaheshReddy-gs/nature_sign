import { useState } from 'react';

const ContactForm = ({ compact = false, onSuccess, initialValues = {} }) => {
    const [ formData, setFormData ] = useState({
        name: '',
        email: '',
        phone: '',
        message: initialValues.message || ''
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
                if (onSuccess) onSuccess();
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
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className={`grid grid-cols-1 ${compact ? '' : 'md:grid-cols-2'} gap-6`}>
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

            <div className={`grid grid-cols-1 ${compact ? '' : 'md:grid-cols-2'} gap-6`}>
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
    );
};

export default ContactForm;
