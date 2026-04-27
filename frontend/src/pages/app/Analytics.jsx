import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, LineChart, Line } from 'recharts';
import { BarChart3, TrendingUp, Cpu } from 'lucide-react';

export const Analytics = () => {
    const { lanes } = useOutletContext();
    const [history, setHistory] = useState([]);

    // Mock predictive data based on current total
    const totalCount = lanes.reduce((acc, curr) => acc + curr.vehicleCount, 0);
    const mockPredictions = [
        { hour: '12:00', load: Math.max(10, totalCount * 1.2) },
        { hour: '13:00', load: Math.max(15, totalCount * 1.5) },
        { hour: '14:00', load: Math.max(8, totalCount * 1.1) },
        { hour: '15:00', load: Math.max(30, totalCount * 2.5) },
        { hour: '16:00', load: Math.max(50, totalCount * 3.8) }, // rush hour spike
        { hour: '17:00', load: Math.max(80, totalCount * 4.5) },
        { hour: '18:00', load: Math.max(60, totalCount * 3.2) },
    ];

    useEffect(() => {
        const timeStr = new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
        setHistory(prev => {
            const next = [...prev, { time: timeStr, total: totalCount, ...lanes.reduce((acc, curr) => ({...acc, [curr.lane]: curr.vehicleCount}), {}) }];
            if (next.length > 20) return next.slice(next.length - 20);
            return next;
        });
    }, [lanes, totalCount]);

    return (
        <div className="p-4 md:p-8 space-y-6">
             <div className="mb-8">
                 <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-2">Deep AI Analytics</h1>
                 <p className="text-gray-500 max-w-2xl font-medium">Time-series tracking of vehicle densities and predictive Big Data models forecasting rush-hour congestion probabilities.</p>
             </div>

             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                 {/* Live Telemetry Span */}
                 <div className="glass-panel p-6 border-t-4 border-t-brand-purple flex flex-col h-[400px]">
                     <h2 className="text-xl font-bold mb-6 flex items-center gap-2 dark:text-white"><BarChart3 className="text-brand-purple" /> Live Node Telemetry</h2>
                     <div className="flex-1 w-full min-h-0 relative">
                         <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={history}>
                                <defs>
                                <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4}/>
                                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                                </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} opacity={0.2} />
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

                 {/* Predictive Model Span */}
                 <div className="glass-panel p-6 border-t-4 border-t-brand-blue flex flex-col h-[400px]">
                     <h2 className="text-xl font-bold mb-6 flex items-center gap-2 dark:text-white"><TrendingUp className="text-brand-blue" /> Machine Learning Forecast</h2>
                     <div className="flex-1 w-full min-h-0 relative">
                         <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={mockPredictions}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} opacity={0.2} />
                                <XAxis dataKey="hour" stroke="#475569" fontSize={10} tickMargin={10} tick={{fill: '#64748b'}} />
                                <YAxis stroke="#475569" fontSize={10} width={25} tick={{fill: '#64748b'}} axisLine={false} tickLine={false} />
                                <Tooltip 
                                contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px', fontSize: '12px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.5)' }}
                                itemStyle={{ color: '#3b82f6', fontWeight: 'bold' }}
                                labelStyle={{ color: '#94a3b8', marginBottom: '4px' }}
                                />
                                <Line type="monotone" dataKey="load" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, fill: '#0f172a', strokeWidth: 2 }} activeDot={{ r: 6 }} />
                            </LineChart>
                         </ResponsiveContainer>
                     </div>
                 </div>
             </div>
        </div>
    );
}
