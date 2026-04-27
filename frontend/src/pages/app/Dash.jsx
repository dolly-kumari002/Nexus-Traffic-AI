import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { AlertsFeed } from '../../components/AlertsFeed';
import { Car, AlertTriangle, ShieldCheck, Camera } from 'lucide-react';

export const Dash = () => {
    const { lanes, alerts } = useOutletContext();
    const [plates, setPlates] = useState([]);
    
    const totalVehicles = lanes.reduce((acc, l) => acc + l.vehicleCount, 0);
    const activeEmergencies = lanes.filter(l => l.emergency).length;
    
    // Calculate global status
    let statusText = 'LOW';
    let statusColor = 'text-brand-green';
    if(totalVehicles > 50) { statusText = 'HIGH'; statusColor = 'text-brand-red'; }
    else if(totalVehicles > 20) { statusText = 'MEDIUM'; statusColor = 'text-brand-yellow'; }

    // Mock ANPR Generation
    useEffect(() => {
        if (totalVehicles === 0) return;
        const interval = setInterval(() => {
            const laneObj = lanes[Math.floor(Math.random() * lanes.length)];
            // Only scan if there are cars
            if(laneObj.vehicleCount === 0) return;
            
            const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            const nums = () => Math.floor(Math.random() * 9);
            const randomPlate = `${chars[nums()]}${chars[nums()]}-${nums()}${nums()}-${chars[nums()]}${chars[nums()]}-${nums()}${nums()}${nums()}${nums()}`;
            const speed = Math.floor(Math.random() * 30 + 30);
            
            setPlates(p => [...p, { id: Date.now(), plate: randomPlate, lane: laneObj.lane, speed, time: new Date().toLocaleTimeString() }].slice(-12));
        }, Math.max(300, 3000 - (totalVehicles * 20)));

        return () => clearInterval(interval);
    }, [lanes, totalVehicles]);

    return (
        <div className="p-4 md:p-8 space-y-6">
            <h1 className="text-3xl font-black text-gray-900 dark:text-white">Global Overview</h1>
            
            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass-panel p-6 border-t-4 border-t-brand-blue">
                    <div className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-2 flex items-center gap-2"><Activity className="text-brand-blue" size={16}/> Live Traffic Status</div>
                    <div className={`text-4xl font-black ${statusColor}`}>{statusText}</div>
                    <div className="text-xs text-gray-400 font-medium mt-2">Overall Grid Congestion</div>
                </div>
                <div className="glass-panel p-6 border-t-4 border-t-brand-purple">
                    <div className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-2 flex items-center gap-2"><Car className="text-brand-purple" size={16}/> Total Vehicles Detected</div>
                    <div className="text-4xl font-black text-gray-900 dark:text-white">{totalVehicles}</div>
                    <div className="text-xs text-gray-400 font-medium mt-2">Active Tracking Count</div>
                </div>
                <div className="glass-panel p-6 border-t-4 border-t-brand-red">
                    <div className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-2 flex items-center gap-2"><ShieldCheck className="text-brand-red" size={16}/> Active Signal Nodes</div>
                    <div className="text-4xl font-black text-gray-900 dark:text-white">4 <span className="text-sm text-gray-500 font-medium">/ 4 Online</span></div>
                    <div className="text-xs text-brand-red font-bold mt-2 animate-pulse">{activeEmergencies > 0 ? `${activeEmergencies} EMERGENCY OVERRIDE ACTIVE` : 'ALL SYSTEMS NOMINAL'}</div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Visual Lane Stats */}
                <div className="glass-panel p-6 h-[400px] flex flex-col">
                     <h2 className="text-lg font-bold mb-6 text-gray-900 dark:text-white shrink-0">Live Node Density</h2>
                     <div className="space-y-4 overflow-y-auto flex-1 custom-scrollbar pr-2">
                         {lanes.map(l => (
                             <div key={l.lane} className="bg-gray-100 dark:bg-dark-900 border border-gray-200 dark:border-dark-700 p-4 rounded-xl flex items-center justify-between">
                                 <div>
                                     <div className="text-sm font-bold uppercase tracking-wider text-gray-500">{l.lane} Node</div>
                                     <div className="text-2xl font-black text-gray-900 dark:text-white">{l.vehicleCount} <span className="text-xs text-gray-400">cars</span></div>
                                 </div>
                                 {l.emergency && (
                                     <div className="bg-brand-red/20 text-brand-red px-3 py-1 rounded-lg text-xs font-bold border border-brand-red/30 animate-pulse flex items-center gap-2">
                                         <AlertTriangle size={14} /> OVERRIDE
                                     </div>
                                 )}
                             </div>
                         ))}
                     </div>
                </div>
                
                {/* ANPR Feed */}
                <div className="glass-panel p-6 h-[400px] flex flex-col">
                    <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-gray-900 dark:text-white"><Camera className="text-brand-purple" /> ANPR Live Scan</h2>
                    <div className="flex-1 bg-[#0f172a] rounded-xl p-4 overflow-y-auto custom-scrollbar font-mono text-[10px] space-y-2">
                        {plates.length === 0 && <span className="text-slate-500">Awaiting visual target acquisition...</span>}
                        {plates.slice().reverse().map(p => (
                            <div key={p.id} className="border-b border-slate-800/50 pb-2 flex justify-between items-center text-slate-300">
                                <div><span className="text-brand-purple">[{p.lane.toUpperCase().substring(0,3)}]</span> {p.plate}</div>
                                <div className="text-slate-500 whitespace-nowrap">{p.speed}km/h</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Alerts Feed */}
                <div className="h-[400px]">
                    <AlertsFeed alerts={alerts} />
                </div>
            </div>
        </div>
    );
};
import { Activity } from 'lucide-react';
