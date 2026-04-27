import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { Intersection } from '../components/Intersection';
import { MetricsPanel } from '../components/MetricsPanel';
import { AlertsFeed } from '../components/AlertsFeed';
import { AdvancedControls } from '../components/AdvancedControls';
import { ShieldAlert, Activity, GitFork } from 'lucide-react';

const SOCKET_URL = 'http://localhost:5005';

function App() {
  const [lanes, setLanes] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const socket = io(SOCKET_URL);

    socket.on('connect', () => {
       setConnected(true);
       setAlerts(prev => [...prev, { type: 'info', title: 'Socket Active', message: 'Uplink established. Waiting for computer vision stream.', timestamp: new Date().toISOString(), id: Date.now() }]);
    });
    
    socket.on('disconnect', () => {
       setConnected(false);
       setAlerts(prev => [...prev, { type: 'emergency', title: 'Fatal Socket Loss', message: 'Connection to main frame lost.', timestamp: new Date().toISOString(), id: Date.now() }]);
    });

    socket.on('traffic_state', (state) => {
      setLanes(state);
    });

    socket.on('alert', (alert) => {
      setAlerts(prev => [...prev, { ...alert, id: Date.now() }].slice(-20)); // Keep last 20
    });

    return () => socket.disconnect();
  }, []);

  const handleSimulateEmergency = () => {
    fetch(`${SOCKET_URL}/api/traffic/update`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ lane: 'north', count: 18, emergency: true })
    }).catch(err => console.error("Could not simulate:", err));
  };
  
  const handleRandomTraffic = () => {
    const randomLane = ['north', 'south', 'east', 'west'][Math.floor(Math.random() * 4)];
    const randomCount = Math.floor(Math.random() * 30);
    fetch(`${SOCKET_URL}/api/traffic/update`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ lane: randomLane, count: randomCount, emergency: false })
    }).catch(err => console.error("Could not simulate:", err));
  };

  const displayLanes = lanes.length > 0 ? lanes : [
    { lane: 'north', vehicleCount: 0, currentLight: 'red', emergency: false },
    { lane: 'south', vehicleCount: 0, currentLight: 'red', emergency: false },
    { lane: 'east', vehicleCount: 0, currentLight: 'red', emergency: false },
    { lane: 'west', vehicleCount: 0, currentLight: 'red', emergency: false }
  ];

  return (
    <div className="min-h-screen p-4 md:p-6 max-w-[1800px] mx-auto flex flex-col gap-6">
      <header className="flex flex-col md:flex-row items-start md:items-center justify-between glass-panel px-8 py-5 border-b-4 border-b-brand-blue/30">
        <div className="flex items-center gap-5">
          <div className="bg-gradient-to-br from-brand-blue to-brand-purple p-[2px] rounded-xl shadow-[0_0_20px_rgba(59,130,246,0.3)]">
             <div className="bg-dark-900 p-3 rounded-xl h-full w-full">
                <ShieldAlert className="text-white" size={32} />
             </div>
          </div>
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-white mb-1">
              Nexus <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-purple">Traffic Control</span>
            </h1>
            <p className="text-[11px] text-gray-400 font-bold tracking-[0.2em] uppercase">Enterprise Autonomous Signal Grid</p>
          </div>
        </div>
        
        <div className="flex mt-4 md:mt-0 items-center gap-4">
           <div className="flex bg-dark-900/60 rounded-lg p-1.5 border border-dark-700/50 gap-2 backdrop-blur-sm shadow-inner">
             <button onClick={handleRandomTraffic} className="flex items-center gap-2 px-4 py-2 rounded-md hover:bg-dark-800 text-sm font-semibold transition-colors text-gray-300">
                <GitFork size={16} className="text-brand-yellow" /> Inject Traffic Node
             </button>
             <button onClick={handleSimulateEmergency} className="flex items-center gap-2 px-4 py-2 rounded-md bg-brand-red/10 border border-brand-red/30 hover:bg-brand-red/20 text-sm font-semibold text-brand-red transition-colors shadow-[0_0_15px_rgba(239,68,68,0.2)]">
                Trigger Ambulance Override
             </button>
           </div>
           
           <div className={`px-5 py-2.5 rounded-xl text-xs font-black tracking-widest flex items-center gap-2 border shadow-lg uppercase ${connected ? 'bg-brand-green/10 text-brand-green border-brand-green/30 shadow-[0_0_15px_rgba(34,197,94,0.2)]' : 'bg-brand-red/10 text-brand-red border-brand-red/30'}`}>
             <Activity size={18} className={connected ? 'animate-pulse' : ''} />
             {connected ? 'Sync Online' : 'Sync Lost'}
           </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1">
         {/* Left Sidebar (Settings and Alerts) */}
         <div className="lg:col-span-3 flex flex-col gap-6">
            <AdvancedControls />
            <div className="flex-1 min-h-[300px]">
              <AlertsFeed alerts={alerts} />
            </div>
         </div>

         {/* Center Top: Graphic */}
         <div className="lg:col-span-6 flex flex-col">
            <Intersection lanes={displayLanes} />
         </div>
         
         {/* Right Sidebar (Analytics) */}
         <div className="lg:col-span-3 flex flex-col h-full">
            <div className="flex-1 flex flex-col">
              <MetricsPanel lanes={displayLanes} />
            </div>
         </div>
      </div>
    </div>
  );
}

export default App;
