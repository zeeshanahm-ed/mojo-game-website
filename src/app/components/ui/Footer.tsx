import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="w-full bg-black text-white p-6 md:p-8 flex flex-col md:flex-row items-center justify-between font-sans">
            {/* Left Section: MOJO Logo and Copyright */}
            <div className="flex flex-col items-center md:items-start mb-4 md:mb-0">
                <h1 className="text-7xl  mb-2 font-bulletproof">
                    MOJO
                </h1>
                <p className="text-sm text-gray-400">
                    © Copyright 2025 MOJO - All Rights Reserved
                </p>
            </div>

            {/* Right Section: Follow Us and Social Icons */}
            <div className="flex flex-col items-center md:items-end">
                <p className="text-lg font-semibold mb-3">Follow us</p>
                <div className="flex space-x-4">
                    <a
                        href="#"
                        className="w-12 h-12 border-2 border-white rounded-lg flex items-center justify-center hover:bg-gray-800 transition-colors"
                        aria-label="Follow us on Instagram"
                    >
                        {/* Instagram SVG Icon */}
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                            <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"></path>
                            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                        </svg>
                    </a>
                    <a
                        href="#"
                        className="w-12 h-12 border-2 border-white rounded-lg flex items-center justify-center hover:bg-gray-800 transition-colors"
                        aria-label="Follow us on TikTok"
                    >
                        {/* TikTok SVG Icon */}
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path d="M9 12a3 3 0 100-6 3 3 0 000 6zM12 15a3 3 0 100-6 3 3 0 000 6zM15 18a3 3 0 100-6 3 3 0 000 6z"></path>
                        </svg>
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;