import React from 'react';
import { motion } from 'framer-motion';
import { Database, Server, Component, TerminalSquare } from 'lucide-react';

export const Tech = () => {
    return (
        <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="flex-1 flex flex-col items-center max-w-7xl mx-auto px-6 py-12 w-full"
        >
            <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4 dark:text-white text-gray-900 tracking-tight">System <span className="text-brand-purple">Architecture</span></h1>
                <p className="text-gray-500 font-medium max-w-2xl mx-auto">A deep dive into the technologies powering the SmartCity Nexus Engine.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">
                <div className="glass-panel p-8">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="p-3 bg-brand-blue/20 rounded-xl"><Server className="text-brand-blue" /></div>
                        <h2 className="text-2xl font-bold dark:text-white text-gray-900">1. AI Vision Node (Python)</h2>
                    </div>
                    <ul className="space-y-4 text-gray-600 dark:text-gray-400 font-medium">
                        <li className="flex gap-2"><span>•</span> Powered by <strong>Ultralytics YOLOv8</strong> for cutting-edge, real-time object detection natively slicing 60 frames per second.</li>
                        <li className="flex gap-2"><span>•</span> Bounding boxes map specifically to <code>vehicle</code> and <code>ambulance</code> classes across specific spatial coordinates mapped to "lanes".</li>
                        <li className="flex gap-2"><span>•</span> Offloads matrix multiplications directly onto dedicated GPUs or gracefully degrades into CPU simulation engines.</li>
                    </ul>
                </div>

                <div className="glass-panel p-8">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="p-3 bg-brand-purple/20 rounded-xl"><TerminalSquare className="text-brand-purple" /></div>
                        <h2 className="text-2xl font-bold dark:text-white text-gray-900">2. The Grand Central (Node.js)</h2>
                    </div>
                    <ul className="space-y-4 text-gray-600 dark:text-gray-400 font-medium">
                        <li className="flex gap-2"><span>•</span> Engineered on <strong>Express</strong> to receive massive telemetry injections via internal REST POST endpoints.</li>
                        <li className="flex gap-2"><span>•</span> Manages the <code>TrafficController</code> class storing the stateful configurations for the current intersection.</li>
                        <li className="flex gap-2"><span>•</span> Computes dynamic durations linearly based on vehicle mass rather than static historical configurations.</li>
                    </ul>
                </div>

                <div className="glass-panel p-8">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="p-3 bg-brand-green/20 rounded-xl"><Database className="text-brand-green" /></div>
                        <h2 className="text-2xl font-bold dark:text-white text-gray-900">3. WebSocket Telemetry (Socket.IO)</h2>
                    </div>
                    <ul className="space-y-4 text-gray-600 dark:text-gray-400 font-medium">
                        <li className="flex gap-2"><span>•</span> Absolute zero-latency duplex channels orchestrated using <strong>Socket.IO</strong> to bind frontend states strictly to backend memory.</li>
                        <li className="flex gap-2"><span>•</span> Emits a persistent <code>traffic_state</code> loop keeping UI animations and logic aligned perfectly with the internal Node state.</li>
                    </ul>
                </div>

                <div className="glass-panel p-8">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="p-3 bg-brand-yellow/20 rounded-xl"><Component className="text-brand-yellow" /></div>
                        <h2 className="text-2xl font-bold dark:text-white text-gray-900">4. Interactive Client (React)</h2>
                    </div>
                    <ul className="space-y-4 text-gray-600 dark:text-gray-400 font-medium">
                        <li className="flex gap-2"><span>•</span> Component-driven routing using <strong>React Router DOM</strong> mapped cleanly via Vite.</li>
                        <li className="flex gap-2"><span>•</span> Renders dense arrays using <strong>Recharts</strong> telemetry and <strong>Framer Motion</strong> for CSS GPU-accelerated node displacements.</li>
                        <li className="flex gap-2"><span>•</span> Complex theming variables passed centrally through a generic highly-responsive CSS framework <strong>TailwindCSS</strong>.</li>
                    </ul>
                </div>
            </div>
        </motion.div>
    );
};
