import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { TrafficCone, Cpu, Activity, UserCog } from 'lucide-react';

export const Signals = () => {
    const { lanes, triggerTraffic } = useOutletContext();
    const [mode, setMode] = useState('auto'); // auto or manual

    return (
        <div className="p-4 md:p-8">
            <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-6">Signal Control Panel</h1>
            <p className="text-gray-500 mb-8 max-w-2xl font-medium">Administrative control over the Nexus node grid. Toggle between Autonomous AI driving and Manual overrides.</p>

            <div className="glass-panel p-8 mb-8 border-t-4 border-t-brand-blue">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2 dark:text-white"><TrafficCone className="text-brand-blue" /> Grid Operational Mode</h2>
                <div className="flex gap-4">
                    <button onClick={() => setMode('auto')} className={`flex-1 p-6 rounded-xl border flex flex-col items-center justify-center gap-3 transition-all ${mode === 'auto' ? 'bg-brand-blue/10 border-brand-blue/50 text-brand-blue shadow-inner' : 'bg-gray-100 dark:bg-dark-900 border-gray-200 dark:border-dark-700 text-gray-500 hover:bg-gray-200 dark:hover:bg-dark-800'}`}>
                        <Cpu size={32} />
                        <span className="font-bold uppercase tracking-wider">Auto Mode (AI Controlled)</span>
                    </button>
                    <button onClick={() => setMode('manual')} className={`flex-1 p-6 rounded-xl border flex flex-col items-center justify-center gap-3 transition-all ${mode === 'manual' ? 'bg-brand-yellow/10 border-brand-yellow/50 text-brand-yellow shadow-inner' : 'bg-gray-100 dark:bg-dark-900 border-gray-200 dark:border-dark-700 text-gray-500 hover:bg-gray-200 dark:hover:bg-dark-800'}`}>
                        <UserCog size={32} />
                        <span className="font-bold uppercase tracking-wider">Manual Override</span>
                    </button>
                </div>
            </div>

            <h2 className="text-xl font-bold mb-4 flex items-center gap-2 dark:text-white mt-12"><Activity className="text-brand-green" /> Inject Traffic Scenarios</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {['north', 'south', 'east', 'west'].map(lane => {
                    const currentCount = lanes.find(l => l.lane === lane)?.vehicleCount || 0;
                    return (
                        <div key={lane} className="glass-panel p-6 flex flex-col items-center text-center">
                            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-2">{lane} Node</h3>
                            <div className="text-3xl font-black text-gray-900 dark:text-white mb-6">{currentCount} <span className="text-xs text-gray-400">Cars</span></div>
                            <button 
                                onClick={() => triggerTraffic({ lane, count: Math.floor(Math.random() * 20 + 5), emergency: false })}
                                className="w-full py-2 bg-gray-200 dark:bg-dark-800 hover:bg-gray-300 dark:hover:bg-dark-700 text-gray-900 dark:text-white rounded-lg text-xs font-bold uppercase transition-colors"
                            >
                                Inject Traffic Spike
                            </button>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};
