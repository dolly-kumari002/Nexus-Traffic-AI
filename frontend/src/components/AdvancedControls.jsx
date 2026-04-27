import React, { useState } from 'react';
import { Settings, Cpu, Database } from 'lucide-react';

export const AdvancedControls = () => {
    const [weather, setWeather] = useState('Clear');
    const [precision, setPrecision] = useState(85);

    return (
        <div className="glass-panel p-6 flex flex-col h-full bg-dark-800/80 border-t-2 border-t-brand-blue">
            <h2 className="text-lg font-bold mb-5 flex items-center gap-2 border-b border-dark-700 pb-3 text-gray-200">
                <Settings className="text-brand-blue" size={20} /> Controller Config
            </h2>

            <div className="space-y-6">
                <div>
                    <h3 className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-3">Weather Factor Simulation</h3>
                    <div className="flex gap-2">
                        {['Clear', 'Rain', 'Snow'].map(w => (
                            <button 
                                key={w} 
                                onClick={() => setWeather(w)}
                                className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all border ${weather === w ? 'bg-brand-blue/20 text-brand-blue border-brand-blue/50 ring-1 ring-brand-blue/50 shadow-[0_0_15px_rgba(59,130,246,0.3)]' : 'bg-dark-900 border-dark-700 text-gray-400 hover:bg-dark-700'}`}
                            >
                                {w}
                            </button>
                        ))}
                    </div>
                    {weather !== 'Clear' && <p className="text-[10px] text-brand-yellow mt-2 opacity-80">* AI increasing braking distances by 30% due to {weather}</p>}
                </div>

                <div>
                    <div className="flex justify-between items-center mb-2">
                        <h3 className="text-xs text-gray-400 font-bold uppercase tracking-wider">Vision Model Threshold</h3>
                        <span className="text-xs font-bold text-brand-blue">{precision}%</span>
                    </div>
                    <input type="range" min="50" max="99" value={precision} onChange={(e) => setPrecision(e.target.value)} className="w-full accent-brand-blue cursor-pointer" />
                </div>

                <div className="grid grid-cols-2 gap-3 pt-4 border-t border-dark-700/50">
                    <div className="bg-dark-900/60 p-3 rounded-xl border border-dark-700 flex items-center gap-3">
                        <Cpu className="text-gray-400" size={18} />
                        <div>
                            <div className="text-[10px] text-gray-500 uppercase font-bold">Node Load</div>
                            <div className="text-sm font-bold text-gray-300">{Math.floor(Math.random() * 15 + 20)}%</div>
                        </div>
                    </div>
                    <div className="bg-dark-900/60 p-3 rounded-xl border border-dark-700 flex items-center gap-3">
                        <Database className="text-gray-400" size={18} />
                        <div>
                            <div className="text-[10px] text-gray-500 uppercase font-bold">API Latency</div>
                            <div className="text-sm font-bold text-gray-300">{Math.floor(Math.random() * 10 + 5)}ms</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
