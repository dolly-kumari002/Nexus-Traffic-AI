import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShieldAlert, Sun, Moon, Menu } from 'lucide-react';
import { useTheme } from '../theme/ThemeContext';
import { motion } from 'framer-motion';

export const Navbar = () => {
    const { theme, toggleTheme } = useTheme();
    const location = useLocation();

    const links = [
        { path: '/', label: 'Home' },
        { path: '/tech', label: 'Tech Stack' },
        { path: '/dashboard', label: 'Command Grid' }
    ];

    return (
        <nav className="glass-panel mx-4 md:mx-auto max-w-[1750px] mt-4 md:mt-6 px-6 py-4 flex items-center justify-between z-50 relative sticky top-6 shadow-2xl">
            <Link to="/" className="flex items-center gap-3">
                <div className="bg-gradient-to-tr from-brand-blue to-brand-purple p-2 rounded-xl shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                    <ShieldAlert className="text-white" size={24} />
                </div>
                <span className="text-2xl font-black dark:text-white text-gray-900 tracking-tight">NEXUS</span>
            </Link>

            <div className="flex items-center gap-6">
                <div className="hidden md:flex items-center gap-8 text-sm font-bold tracking-wide uppercase">
                    {links.map((link) => (
                        <Link 
                            key={link.path}
                            to={link.path} 
                            className={`relative px-1 transition-colors ${location.pathname === link.path ? 'text-brand-blue' : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'}`}
                        >
                            {link.label}
                            {location.pathname === link.path && (
                                <motion.div layoutId="underline" className="absolute -bottom-2 left-0 right-0 h-0.5 bg-brand-blue" />
                            )}
                        </Link>
                    ))}
                </div>
                
                <div className="w-px h-6 bg-gray-300 dark:bg-dark-700 hidden md:block"></div>

                <button onClick={toggleTheme} className="p-2.5 rounded-full bg-gray-100 dark:bg-dark-900 border border-gray-200 dark:border-dark-700 hover:bg-gray-200 dark:hover:bg-dark-800 transition-colors shadow-inner">
                    {theme === 'dark' ? <Sun size={18} className="text-brand-yellow" /> : <Moon size={18} className="text-gray-600" />}
                </button>
                
                <Link to="/dashboard" className="hidden md:block bg-gray-900 dark:bg-white dark:text-gray-900 text-white px-6 py-2.5 rounded-xl text-sm font-black shadow-lg transition-all hover:scale-105 uppercase tracking-wider">
                    Launch App
                </Link>
                
                <button className="md:hidden p-2">
                    <Menu className="dark:text-white" />
                </button>
            </div>
        </nav>
    );
};
