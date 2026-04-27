import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Activity, Camera, Cpu, ShieldAlert } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Home = () => {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex-1 flex flex-col items-center max-w-7xl mx-auto px-6 pt-20 pb-20 w-full"
        >
            <div className="text-center max-w-4xl mt-12 mb-20 relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-brand-blue/20 blur-[100px] rounded-full -z-10"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-32 bg-brand-purple/20 blur-[120px] rounded-full -z-10"></div>

                <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-blue/10 border border-brand-blue/30 text-brand-blue text-sm font-bold mb-8 uppercase tracking-widest"
                >
                    <Activity size={16} /> Welcome to the Future of Urban Transit
                </motion.div>
                
                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 text-gray-900 dark:text-white leading-tight">
                    Eradicate Gridlock with <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-purple">AI Inference.</span>
                </h1>
                
                <p className="text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto font-medium">
                    Nexus is an enterprise-grade Smart City operating system tying deep learning YOLO Vision Models seamlessly into WebSocket-orchestrated Dynamic Signal Grids.
                </p>

                <div className="flex items-center justify-center gap-6">
                    <Link to="/dashboard" className="bg-brand-blue hover:bg-blue-600 shadow-[0_0_30px_rgba(59,130,246,0.4)] text-white px-8 py-4 rounded-xl font-bold text-lg flex items-center gap-3 transition-all hover:scale-105">
                        Open Command Grid <ArrowRight size={20} />
                    </Link>
                    <Link to="/tech" className="bg-gray-200 dark:bg-dark-800 hover:bg-gray-300 dark:hover:bg-dark-700 text-gray-900 dark:text-white px-8 py-4 rounded-xl font-bold text-lg flex items-center gap-3 transition-all border border-gray-300 dark:border-dark-700">
                        View Architecture
                    </Link>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mt-10">
                <motion.div whileHover={{ y: -10 }} className="glass-panel p-8 text-left border-t-4 border-t-brand-blue">
                    <div className="bg-brand-blue/20 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 border border-brand-blue/30">
                        <Camera className="text-brand-blue" size={28} />
                    </div>
                    <h3 className="text-2xl font-black mb-3 dark:text-white text-gray-900">Computer Vision</h3>
                    <p className="dark:text-gray-400 text-gray-600 font-medium">Native integration with YOLOv8 via Python to slice frames natively and accurately classify dense clusters at 60 FPS.</p>
                </motion.div>
                
                <motion.div whileHover={{ y: -10 }} className="glass-panel p-8 text-left border-t-4 border-t-brand-purple">
                    <div className="bg-brand-purple/20 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 border border-brand-purple/30">
                        <Cpu className="text-brand-purple" size={28} />
                    </div>
                    <h3 className="text-2xl font-black mb-3 dark:text-white text-gray-900">Quantum Routing</h3>
                    <p className="dark:text-gray-400 text-gray-600 font-medium">Node.js algorithmic controller balances the time delays against dynamically calculated vehicle densities across 4 vectors simultaneously.</p>
                </motion.div>

                <motion.div whileHover={{ y: -10 }} className="glass-panel p-8 text-left border-t-4 border-t-brand-red">
                    <div className="bg-brand-red/20 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 border border-brand-red/30">
                        <ShieldAlert className="text-brand-red" size={28} />
                    </div>
                    <h3 className="text-2xl font-black mb-3 dark:text-white text-gray-900">Green Corridor</h3>
                    <p className="dark:text-gray-400 text-gray-600 font-medium">Life-saving absolute override protocol. Flashes the entire grid and enforces prioritized routing for detected EMT transports.</p>
                </motion.div>
            </div>
        </motion.div>
    );
};
