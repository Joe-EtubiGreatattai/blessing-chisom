import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Instagram, Linkedin, Mail, Menu, X, LogIn, LogOut } from 'lucide-react';

const Header = ({ isAuthenticated, onLogout }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();
    const currentPath = location.pathname;

    const isActive = (path) => {
        if (path === '/') return currentPath === '/';
        return currentPath.startsWith(path);
    };

    return (
        <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo / Brand */}
                    <Link to="/" className="flex-shrink-0 cursor-pointer group">
                        <h1 className="text-2xl font-bold tracking-tight text-gray-900 group-hover:text-gray-600 transition-colors font-serif">
                            Blessing Chisom<span className="text-gray-400 font-light"> Made...</span>
                        </h1>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex space-x-8 items-center">
                        <Link
                            to="/"
                            className={`text-sm font-medium transition-colors ${isActive('/') ? 'text-gray-900' : 'text-gray-500 hover:text-gray-900'}`}
                        >
                            Work
                        </Link>
                        <Link
                            to="/about"
                            className={`text-sm font-medium transition-colors ${isActive('/about') ? 'text-gray-900' : 'text-gray-500 hover:text-gray-900'}`}
                        >
                            About
                        </Link>

                        {isAuthenticated ? (
                            <>
                                <Link
                                    to="/dashboard"
                                    className={`text-sm font-medium transition-colors ${isActive('/dashboard') ? 'text-gray-900' : 'text-gray-500 hover:text-gray-900'}`}
                                >
                                    Dashboard
                                </Link>
                                <button
                                    onClick={onLogout}
                                    className="text-gray-500 hover:text-red-600 transition-colors flex items-center gap-1 text-sm font-medium"
                                >
                                    <LogOut size={16} /> Logout
                                </button>
                            </>
                        ) : (
                            <Link
                                to="/login"
                                className="text-gray-400 hover:text-gray-900 transition-colors flex items-center gap-1 text-sm font-medium"
                            >
                                <LogIn size={16} /> Studio
                            </Link>
                        )}

                        <a
                            href="#"
                            className="text-gray-400 hover:text-gray-600 transition-colors ml-4"
                            aria-label="Contact via Email"
                        >
                            <Mail size={20} />
                        </a>
                    </nav>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-gray-500 hover:text-gray-900 p-2"
                        >
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Nav Dropdown */}
            {isMenuOpen && (
                <div className="md:hidden bg-white border-t border-gray-100 shadow-lg absolute w-full left-0">
                    <div className="px-4 pt-2 pb-6 space-y-2">
                        <Link
                            to="/"
                            onClick={() => setIsMenuOpen(false)}
                            className={`block w-full text-left px-3 py-3 text-base font-medium rounded-md ${isActive('/') ? 'bg-gray-50 text-gray-900' : 'text-gray-600 hover:bg-gray-50'}`}
                        >
                            Work
                        </Link>
                        <Link
                            to="/about"
                            onClick={() => setIsMenuOpen(false)}
                            className={`block w-full text-left px-3 py-3 text-base font-medium rounded-md ${isActive('/about') ? 'bg-gray-50 text-gray-900' : 'text-gray-600 hover:bg-gray-50'}`}
                        >
                            About
                        </Link>
                        {isAuthenticated ? (
                            <>
                                <Link
                                    to="/dashboard"
                                    onClick={() => setIsMenuOpen(false)}
                                    className={`block w-full text-left px-3 py-3 text-base font-medium rounded-md ${isActive('/dashboard') ? 'bg-gray-50 text-gray-900' : 'text-gray-600 hover:bg-gray-50'}`}
                                >
                                    Dashboard
                                </Link>
                                <button
                                    onClick={() => { onLogout(); setIsMenuOpen(false); }}
                                    className="block w-full text-left px-3 py-3 text-base font-medium rounded-md text-red-600 hover:bg-red-50"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <Link
                                to="/login"
                                onClick={() => setIsMenuOpen(false)}
                                className="block w-full text-left px-3 py-3 text-base font-medium rounded-md text-gray-600 hover:bg-gray-50"
                            >
                                Studio
                            </Link>
                        )}
                        <div className="px-3 py-3 text-gray-500 flex gap-4">
                            <Mail size={20} />
                            <Instagram size={20} />
                            <Linkedin size={20} />
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
