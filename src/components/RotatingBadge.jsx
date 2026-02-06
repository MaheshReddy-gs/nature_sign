import { motion } from 'framer-motion';

export function ReraBadge({ size = 120, className = "" }) {
    return (
        <div
            className={`relative ${className}`}
            style={{ width: size, height: size }}
        >
            {/* Rotating outer text ring */}
            <motion.div
                className="absolute inset-0"
                animate={{ rotate: -360 }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                }}
            >
                <svg viewBox="0 0 200 200" className="w-full h-full">
                    <defs>
                        <path
                            id="reraCirclePath"
                            d="M 100, 100 m -85, 0 a 85,85 0 1,1 170,0 a 85,85 0 1,1 -170,0"
                            fill="none"
                        />
                    </defs>

                    {/* Rotating circular text */}
                    <text
                        fill="white"
                        fontSize="18"
                        fontWeight="500"
                        letterSpacing="8"
                    >
                        <textPath href="#reraCirclePath" startOffset="0%">
                            RERA CERTIFIED • RERA CERTIFIED •
                        </textPath>
                    </text>
                </svg>
            </motion.div>

            {/* Static center - Your image */}
            <div className="absolute inset-0 flex items-center justify-center">
                <img
                    src="/biappa1.svg"
                    alt="RERA Certified"
                    style={{ width: size * 0.66, height: size * 0.55 }}
                    className="object-contain"
                />
            </div>
        </div>
    );
}

export function BiaapaBadge({ size = 120, className = "" }) {
    return (
        <div
            className={`relative ${className}`}
            style={{ width: size, height: size }}
        >
            {/* Rotating outer text ring */}
            <motion.div
                className="absolute inset-0"
                animate={{ rotate: -360 }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                }}
            >
                <svg viewBox="0 0 200 200" className="w-full h-full">
                    <defs>
                        <path
                            id="biaapaCirclePath"
                            d="M 100, 100 m -85, 0 a 85,85 0 1,1 170,0 a 85,85 0 1,1 -170,0"
                            fill="none"
                        />
                    </defs>

                    {/* Rotating circular text */}
                    <text
                        fill="white"
                        fontSize="16"
                        fontWeight="500"
                        letterSpacing="6"
                    >
                        <textPath href="#biaapaCirclePath" startOffset="0%">
                            BIAAPA APPROVED • BIAAPA APPROVED •
                        </textPath>
                    </text>
                </svg>
            </motion.div>

            {/* Static center - Your image */}
            <div className="absolute inset-0 flex items-center justify-center">
                <img
                    src="/Rera1.svg"
                    alt="BIAAPA Approved"
                    style={{ width: size * 0.44, height: size * 0.33 }}
                    className="object-contain"
                />
            </div>
        </div>
    );
}

export default ReraBadge;
