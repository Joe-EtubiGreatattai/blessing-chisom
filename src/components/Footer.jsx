import React from 'react';
import { Instagram, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-white border-t border-gray-100 mt-auto">
            <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-gray-400 text-sm">
                    © {new Date().getFullYear()} Blessing Ossom Made... All rights reserved.
                </p>
                <div className="flex items-center gap-6">
                    <div className="flex space-x-6 text-gray-400">
                        <a href="#" className="hover:text-gray-600 transition-colors"><Instagram size={18} /></a>
                        <a href="#" className="hover:text-gray-600 transition-colors"><Linkedin size={18} /></a>
                        <a href="#" className="hover:text-gray-600 transition-colors"><Mail size={18} /></a>
                    </div>
                    <button
                        onClick={() => {
                            if (confirm('Reset all data to defaults?')) {
                                localStorage.clear();
                                window.location.reload();
                            }
                        }}
                        className="text-xs text-gray-300 hover:text-red-400 transition-colors"
                    >
                        Reset Data
                    </button>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
