import { useEffect, useState } from 'react';
import CustomButton from './CustomButton';

const ContactForm = ({ compact = false, onSuccess, initialValues = {}, submitText = "Get A Call Back" }) => {
    const [ formData, setFormData ] = useState({
        name: '',
        email: '',
        phone: '',
        message: initialValues.message || ''
    });
    const [ errors, setErrors ] = useState({});
    const [ isSubmitting, setIsSubmitting ] = useState(false);
    const [ submissionStatus, setSubmissionStatus ] = useState(null); // 'success' | 'error' | null

    useEffect(() => {
        if (initialValues.message) {
            setFormData(prev => ({ ...prev, message: initialValues.message }));
        }
    }, [ initialValues.message ]);

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

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsSubmitting(true);
        setSubmissionStatus(null);

        const scriptURL = 'https://script.google.com/macros/s/AKfycbyyT_ERLeYkpKWioNzNZS2AmuGLs4lfSBAvaP2kmFN3ZAT4g1XGi6roc5oGGFyhewepKQ/exec';
        // const crmHost = 'https://devcrm.makonissoft.com/';
        const crmHost = 'http://143.110.251.119:9100/';
        const crmURL = `${crmHost}webhooks/website/leads/`;

        const payload = {
            ...formData,
            website: "Nature's Sign"
        };

        const crmPayload = {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            message: formData.message,
            website_url: "https://www.naturessignbyshreyas.com/"
        };

        const emailRequest = fetch(scriptURL, {
            method: 'POST',
            headers: { 'Content-Type': 'text/plain;charset=utf-8' },
            body: JSON.stringify(payload)
        }).then(response => {
            if (!response.ok) {
                throw new Error(`Email API failed with status ${response.status}`);
            }
            return response.json();
        });

        const crmRequest = fetch(crmURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-WEBSITE-TOKEN': 'JGBYtyfvht675GVYFYTFV565fvyfuytHGUjhgbuyg67vtvTftffTF7jyb35BGUJGUHGBtb6oxdioseodxwLOEO9w'
            },
            body: JSON.stringify(crmPayload)
        }).then(response => {
            if (!response.ok) {
                throw new Error(`CRM API failed with status ${response.status}`);
            }
            return response;
        });

        try {
            await Promise.all([ emailRequest, crmRequest ]);
            setSubmissionStatus('success');
            setFormData({ name: '', email: '', phone: '', message: '' });
            if (onSuccess) onSuccess();
        } catch (error) {
            console.error('Error submitting form:', error);
            setSubmissionStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "phone") {
            if (!/^\d*$/.test(value)) return;
            if (value.length > 10) return;
        }

        setFormData({
            ...formData,
            [ name ]: value,
        });

        setErrors({
            ...errors,
            [ name ]: "",
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className={`grid grid-cols-1 ${compact ? '' : 'md:grid-cols-2'} gap-6`}>
                <div>
                    <input
                        type="text"
                        name="name"
                        placeholder="Your Name*"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-6 py-4 bg-[#f2f2f2]   rounded text-black placeholder-black/60 focus:outline-none focus:ring-1 focus:ring-black"
                    />
                    {errors.name && (
                        <p className="text-red-500 text-sm mt-1 ml-2">{errors.name}</p>
                    )}
                </div>

                <input
                    type="email"
                    name="email"
                    placeholder="Email*"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-6 py-4 bg-[#f2f2f2]   rounded text-black placeholder-black/60 focus:outline-none focus:ring-1 focus:ring-black"
                />
            </div>

            <div className={`grid grid-cols-1 ${compact ? '' : 'md:grid-cols-2'} gap-6`}>
                <div>
                    <input
                        type="tel"
                        name="phone"
                        placeholder="Phone Number *"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-6 py-4 bg-[#f2f2f2]   rounded text-black placeholder-black/60 focus:outline-none focus:ring-1 focus:ring-black"
                    />
                    {errors.phone && (
                        <p className="text-red-500 text-sm mt-1 ml-2">{errors.phone}</p>
                    )}
                </div>

                <textarea
                    name="message"
                    placeholder="Your inquiry about..."
                    value={formData.message}
                    onChange={handleChange}
                    rows="1"
                    className="w-full px-6 py-4 bg-[#f2f2f2]   rounded text-black placeholder-black/60 focus:outline-none focus:ring-1 focus:ring-black resize-none"
                ></textarea>
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mt-8">
                <p className="text-black text-xs font-medium md:text-sm">
                    Required fields are marked *
                </p>

                <CustomButton hoverBorderColor='#e4daca'
                    type="submit"
                    disabled={isSubmitting}
                    className={` transition-all duration-100 ${isSubmitting ? "opacity-60 cursor-not-allowed" : ""
                        }`}
                >
                    {isSubmitting ? "Sending..." : submitText}
                </CustomButton>
            </div>

            <div>
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
