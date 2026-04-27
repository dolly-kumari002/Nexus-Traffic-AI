import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity } from 'lucide-react';

export const MetricsPanel = ({ lanes }) => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
     const totalCount = lanes.reduce((acc, curr) => acc + curr.vehicleCount, 0);
     const timeStr = new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
     
     setHistory(prev => {
        const next = [...prev, { time: timeStr, total: totalCount, ...lanes.reduce((acc, curr) => ({...acc, [curr.lane]: curr.vehicleCount}), {}) }];
        // Keep last 15 points
        if (next.length > 15) return next.slice(next.length - 15);
        return next;
     });
  }, [lanes]);

  return (
    <div className="glass-panel p-6 flex flex-col h-full bg-dark-800/80 border-t-2 border-t-brand-purple">
      <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-gray-200 border-b border-dark-700 pb-3">
        <Activity className="text-brand-purple" size={20}/> Telemetry Log
      </h2>
      
      <div className="grid grid-cols-4 gap-2 mb-4">
          {lanes.map(l => (
             <div key={l.lane} className="bg-dark-900/60 p-2 rounded-lg text-center border border-dark-700/50 flex flex-col items-center justify-center relative overflow-hidden">
                <div className="text-[10px] uppercase text-gray-500 font-bold">{l.lane}</div>
                <div className="font-bold text-xl text-gray-200">{l.vehicleCount}</div>
                {/* Mini background progress */}
                <div className="absolute bottom-0 left-0 h-1 bg-brand-purple opacity-30 transition-all" style={{ width: `${Math.min((l.vehicleCount/30)*100, 100)}%`}}></div>
             </div>
          ))}
      </div>

      <div className="flex-1 min-h-[160px] w-full mt-2 relative">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={history}>
            <defs>
              <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis dataKey="time" stroke="#475569" fontSize={10} tickMargin={10} tick={{fill: '#64748b'}} />
            <YAxis stroke="#475569" fontSize={10} width={25} tick={{fill: '#64748b'}} axisLine={false} tickLine={false} />
            <Tooltip 
               contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px', fontSize: '12px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.5)' }}
               itemStyle={{ color: '#e2e8f0', fontWeight: 'bold' }}
               labelStyle={{ color: '#94a3b8', marginBottom: '4px' }}
            />
            <Area type="step" dataKey="total" stroke="#8b5cf6" strokeWidth={2} fillOpacity={1} fill="url(#colorTotal)" isAnimationActive={true} animationDuration={300} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
