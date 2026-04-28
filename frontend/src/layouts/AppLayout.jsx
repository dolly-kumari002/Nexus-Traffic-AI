import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { io } from 'socket.io-client';
import { LayoutDashboard, Map, TrafficCone, ShieldAlert, BarChart3, Activity, ShieldCheck, ArrowLeft } from 'lucide-react';
import { useTheme } from '../theme/ThemeContext';

const SOCKET_URL = 'https://nexus-traffic-ai-f5k3.onrender.com';

export const AppLayout = () => {
  const [lanes, setLanes] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [connected, setConnected] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const socket = io(SOCKET_URL);
    socket.on('connect', () => setConnected(true));
    socket.on('disconnect', () => setConnected(false));
    socket.on('traffic_state', setLanes);
    socket.on('alert', (alert) => {
      setAlerts(prev => [...prev, { ...alert, id: Date.now() }].slice(-30));
      
      // Autonomous Voice Alert System
      if ('speechSynthesis' in window) {
         window.speechSynthesis.cancel(); // cancel any currently playing
         const utterance = new SpeechSynthesisUtterance(alert.message);
         utterance.rate = 1.15;
         utterance.pitch = 0.95;
         // Attempt to select a tech-sounding voice if available
         const voices = window.speechSynthesis.getVoices();
         const enVoice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Google') || v.name.includes('Samantha')));
         if (enVoice) utterance.voice = enVoice;
         
         window.speechSynthesis.speak(utterance);
      }
    });
    return () => socket.disconnect();
  }, []);

  const navItems = [
    { name: 'Dashboard', path: '/app/dashboard', icon: LayoutDashboard },
    { name: 'Live Map', path: '/app/map', icon: Map },
    { name: 'Signal Control', path: '/app/signals', icon: TrafficCone },
    { name: 'Emergency Tracker', path: '/app/emergency', icon: ShieldAlert },
    { name: 'Analytics', path: '/app/analytics', icon: BarChart3 }
  ];

  const defaultLanes = lanes.length > 0 ? lanes : [
    { lane: 'north', vehicleCount: 0, currentLight: 'red', emergency: false },
    { lane: 'south', vehicleCount: 0, currentLight: 'red', emergency: false },
    { lane: 'east', vehicleCount: 0, currentLight: 'red', emergency: false },
    { lane: 'west', vehicleCount: 0, currentLight: 'red', emergency: false }
  ];

  // Helper function to trigger traffic/emergencies safely
  const triggerTraffic = (payload) => {
     fetch(`${SOCKET_URL}/api/traffic/update`, {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify(payload)
     }).catch(e => console.error("API error", e));
  };

  return (
    <div className="flex h-screen w-full bg-gray-50 dark:bg-[#0c1017] transition-colors duration-300 overflow-hidden font-sans">
      {/* Sidebar Navigation */}
      <aside className="w-64 border-r border-gray-200 dark:border-dark-700 bg-white dark:bg-[#121826] flex flex-col shadow-2xl z-20 shrink-0">
        <div className="p-6 border-b border-gray-200 dark:border-dark-700 flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-tr from-brand-blue to-brand-purple p-2 rounded-lg text-white shadow-lg"><ShieldCheck size={24} /></div>
            <div>
               <h2 className="font-black text-xl tracking-tight text-gray-900 dark:text-white leading-none">NEXUS</h2>
               <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-brand-blue">Admin Portal</span>
            </div>
          </div>
          <Link to="/" className="text-xs text-gray-500 hover:text-gray-800 dark:hover:text-gray-300 font-bold flex items-center gap-1"><ArrowLeft size={12}/> Exit to Main Site</Link>
        </div>
        
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navItems.map(item => {
            const isActive = location.pathname.startsWith(item.path);
            const Icon = item.icon;
            return (
              <Link key={item.path} to={item.path} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-bold text-sm ${isActive ? 'bg-brand-blue/10 text-brand-blue border border-brand-blue/30 shadow-inner' : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-dark-800 dark:text-gray-400 border border-transparent'}`}>
                <Icon size={18} className={isActive ? 'text-brand-blue' : ''} /> {item.name}
              </Link>
            )
          })}
        </nav>

        <div className="p-6 border-t border-gray-200 dark:border-dark-700">
           <div className="bg-gray-100 dark:bg-dark-900 border border-gray-200 dark:border-dark-800 p-4 rounded-xl shadow-inner">
             <h3 className="text-[10px] uppercase font-black text-gray-400 mb-2 tracking-widest">Network Status</h3>
             <div className={`flex items-center gap-2 text-xs font-black uppercase tracking-wider ${connected ? 'text-brand-green' : 'text-brand-red'}`}>
               <Activity size={16} className={connected ? 'animate-pulse' : ''} />
               {connected ? 'Sync Online' : 'Sync Offline'}
             </div>
           </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 h-screen overflow-y-auto relative no-scrollbar">
        <Outlet context={{ lanes: defaultLanes, alerts, connected, triggerTraffic }} />
      </main>
    </div>
  );
};
