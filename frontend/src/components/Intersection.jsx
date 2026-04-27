import React from 'react';
import { TrafficLight } from './TrafficLight';
import { motion, AnimatePresence } from 'framer-motion';

export const Intersection = ({ lanes }) => {
  const getLaneData = (id) => lanes.find(l => l.lane === id) || { currentLight: 'red', vehicleCount: 0, emergency: false };

  // Render mock vehicles queuing up based on counts
  const renderCars = (laneId, count, isVertical, isReverseFlow) => {
     const maxVisible = Math.min(count, 8); 
     return Array.from({length: maxVisible}).map((_, i) => (
         <motion.div 
            key={`${laneId}-${i}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`w-3 h-3 rounded-[2px] absolute ${isVertical ? 'left-1/2 -translate-x-1/2' : 'top-1/2 -translate-y-1/2'} bg-gray-200 shadow-[0_0_5px_rgba(255,255,255,0.5)]`}
            style={{ 
               [isReverseFlow ? 'top' : 'bottom']: isVertical ? `${i * 15 + 10}px` : 'auto',
               [isReverseFlow ? 'left' : 'right']: !isVertical ? `${i * 15 + 10}px` : 'auto',
            }}
         />
     ));
  };

  return (
    <div className="glass-panel p-2 md:p-8 w-full flex flex-col items-center justify-center relative overflow-hidden min-h-[550px] bg-dark-900 border-y-2 border-y-brand-purple/20 shadow-[inset_0_0_150px_rgba(0,0,0,0.8)]">
      <div className="absolute top-4 left-6 flex items-center gap-2 z-30">
          <div className="w-2 h-2 rounded-full bg-brand-green animate-pin shadow-[0_0_10px_#22c55e]"></div>
          <span className="text-[10px] font-mono text-gray-500 tracking-widest uppercase">Live Node Telemetry</span>
      </div>

      <div className="relative w-full max-w-[600px] aspect-square flex items-center justify-center mt-6">
        
        {/* Animated Map Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand-blue/5 via-dark-900/0 to-transparent pointer-events-none"></div>

        {/* Visual Roads */}
        <div className="absolute w-40 h-[100%] bg-[#1a1a1a] flex justify-center shadow-[0_0_50px_rgba(0,0,0,0.9)]">
            <div className="h-full border-l-2 border-dashed border-brand-yellow/30"></div>
        </div>
        <div className="absolute h-40 w-[100%] bg-[#1a1a1a] flex items-center justify-center shadow-[0_0_50px_rgba(0,0,0,0.9)]">
            <div className="w-full border-t-2 border-dashed border-brand-yellow/30"></div>
        </div>
        
        {/* Center Intersection Box */}
        <div className="absolute w-40 h-40 bg-[#161616] z-10 flex items-center justify-center overflow-hidden border border-dark-700/30">
             {/* Dynamic radar ring */}
             <div className="absolute w-[200%] h-[200%] border border-brand-blue/10 rounded-full animate-[spin_5s_linear_infinite]">
                 <div className="w-8 h-8 rounded-full bg-brand-blue/20 absolute top-0 left-1/2 -translate-x-1/2 blur-md"></div>
             </div>
             
             {/* Center marker */}
             <div className="w-3 h-3 rounded-sm rotate-45 bg-[#333] border border-[#555]"></div>
        </div>

        {/* Vehicles Container */}
        {/* North Lane (cars coming from top, so they build up at bottom of the top segment) */}
        <div className="absolute top-0 bottom-1/2 left-[calc(50%-40px)] w-20 z-15">
            {renderCars('north', getLaneData('north').vehicleCount, true, false)}
        </div>
        {/* South Lane (cars building up at top of the bottom segment) */}
        <div className="absolute top-1/2 bottom-0 left-[calc(50%+20px)] w-20 z-15">
            {renderCars('south', getLaneData('south').vehicleCount, true, true)}
        </div>
        {/* West Lane (cars building up at right of left segment) */}
        <div className="absolute top-[calc(50%+20px)] right-1/2 left-0 h-20 z-15">
            {renderCars('west', getLaneData('west').vehicleCount, false, false)}
        </div>
        {/* East Lane (cars building up at left of right segment) */}
        <div className="absolute top-[calc(50%-40px)] right-0 left-1/2 h-20 z-15">
            {renderCars('east', getLaneData('east').vehicleCount, false, true)}
        </div>

        {/* Traffic Lights Positioning */}
        <div className="absolute top-2 z-20">
          <TrafficLight direction="North" color={getLaneData('north').currentLight} />
        </div>
        <div className="absolute bottom-2 z-20">
          <TrafficLight direction="South" color={getLaneData('south').currentLight} />
        </div>
        <div className="absolute left-2 z-20">
           <div className="rotate-90 origin-center translate-x-4">
              <TrafficLight direction="West" color={getLaneData('west').currentLight} />
           </div>
        </div>
        <div className="absolute right-2 z-20">
           <div className="-rotate-90 origin-center -translate-x-4">
              <TrafficLight direction="East" color={getLaneData('east').currentLight} />
           </div>
        </div>

        {/* Emergency & Accident Overlays */}
        <AnimatePresence>
            {lanes.map((l) => {
               if (l.emergency) {
                  return (
                    <motion.div 
                      key={`em-${l.lane}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0, 0.4, 0] }}
                      exit={{ opacity: 0 }}
                      transition={{ repeat: Infinity, duration: 0.8 }}
                      className={`absolute bg-brand-red z-25 pointer-events-none mix-blend-screen shadow-[0_0_50px_#ef4444] ${
                         l.lane === 'north' ? 'w-40 h-[100%] top-0 left-1/2 -translate-x-1/2 bg-gradient-to-b from-brand-red/0 to-brand-red/50' :
                         l.lane === 'south' ? 'w-40 h-[100%] bottom-0 left-1/2 -translate-x-1/2 bg-gradient-to-t from-brand-red/0 to-brand-red/50' :
                         l.lane === 'east' ? 'h-40 w-[100%] right-0 top-1/2 -translate-y-1/2 bg-gradient-to-l from-brand-red/0 to-brand-red/50' :
                         'h-40 w-[100%] left-0 top-1/2 -translate-y-1/2 bg-gradient-to-r from-brand-red/0 to-brand-red/50'
                      }`}
                    />
                  );
               }
               return null;
            })}
        </AnimatePresence>

      </div>
    </div>
  );
};
