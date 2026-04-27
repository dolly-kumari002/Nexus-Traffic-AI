import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { ShieldAlert, Crosshair, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Emergency = () => {
    const { lanes, triggerTraffic, alerts } = useOutletContext();
    const emergencyAlerts = alerts.filter(a => a.type === 'emergency');

    const activeEmergencies = lanes.filter(l => l.emergency);

    return (
        <div className="p-4 md:p-8 flex flex-col h-full">
            <div className="flex justify-between items-start mb-8">
                <div>
                     <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-2">Emergency Tracking</h1>
                     <p className="text-gray-500 max-w-2xl font-medium">Absolute USP feature. The system autonomously drops all standard queuing logic to forge a dedicated high-speed "Green Corridor" for incoming EMT, Fire, and Police nodes.</p>
                </div>
                <div className={`px-4 py-2 rounded-xl text-xs font-black tracking-widest flex items-center gap-2 border shadow-lg uppercase ${activeEmergencies.length > 0 ? 'bg-brand-red/10 text-brand-red border-brand-red/30 shadow-[0_0_20px_rgba(239,68,68,0.4)] animate-pulse' : 'bg-brand-green/10 text-brand-green border-brand-green/30'}`}>
                     <ShieldAlert size={18} /> {activeEmergencies.length > 0 ? 'CORRIDOR ACTIVE' : 'NO EMERGENCIES'}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 flex-1">
                <div className="glass-panel p-6 border-t-4 border-t-brand-red h-[500px] flex flex-col">
                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2 dark:text-white"><AlertTriangle className="text-brand-red" /> Live Override Log</h2>
                    <div className="flex-1 overflow-y-auto pr-2 space-y-3 custom-scrollbar">
                        <AnimatePresence>
                        {emergencyAlerts.length === 0 ? (
                            <div className="text-gray-500 text-center py-12 font-medium tracking-wide">No emergencies recorded in current session.</div>
                        ) : (
                            emergencyAlerts.slice().reverse().map(alert => (
                                <motion.div key={alert.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-brand-red/10 border border-brand-red/30 p-4 rounded-xl flex gap-4 pr-12 relative overflow-hidden">
                                     <div className="absolute right-0 top-0 bottom-0 w-2 bg-brand-red"></div>
                                     <Crosshair className="text-brand-red shrink-0" />
                                     <div>
                                         <div className="text-sm font-bold text-red-700 dark:text-red-400">{alert.title}</div>
                                         <div className="text-xs text-red-900 dark:text-red-200 mt-1 opacity-80">{alert.message}</div>
                                         <div className="text-[10px] text-brand-red mt-2 font-mono">{new Date(alert.timestamp).toLocaleTimeString()}</div>
                                     </div>
                                </motion.div>
                            ))
                        )}
                        </AnimatePresence>
                    </div>
                </div>

                <div className="glass-panel p-6 border-t-4 border-t-brand-blue flex flex-col justify-between">
                    <div>
                         <h2 className="text-xl font-bold mb-2 flex items-center gap-2 dark:text-white"><ShieldAlert className="text-brand-blue" /> Trigger Corridors</h2>
                         <p className="text-sm text-gray-500 mb-6">Dispatch simulated emergency vehicles into specific nodes to observe the real-time AI grid-lock suppression.</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                        {['north', 'south', 'east', 'west'].map(lane => (
                            <button 
                                key={`em-${lane}`}
                                onClick={() => triggerTraffic({ lane, count: 1, emergency: true })}
                                className="p-6 bg-gray-100 dark:bg-dark-900 border border-gray-200 dark:border-dark-700 hover:border-brand-blue/50 hover:bg-brand-blue/5 transition-all rounded-xl text-center flex flex-col items-center justify-center gap-3 relative overflow-hidden group"
                            >
                                <div className="absolute inset-0 bg-brand-blue/0 group-hover:bg-brand-blue/10 transition-colors"></div>
                                <ShieldAlert size={24} className="text-gray-400 group-hover:text-brand-blue transition-colors relative z-10" />
                                <span className="font-black uppercase tracking-widest text-xs text-gray-500 group-hover:text-brand-blue transition-colors relative z-10">Dispatch {lane}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
