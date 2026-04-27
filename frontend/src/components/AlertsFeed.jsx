import React from 'react';
import { Bell, AlertCircle, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const AlertsFeed = ({ alerts }) => {
  return (
    <div className="glass-panel p-6 flex flex-col h-full max-h-[400px]">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <Bell className="text-brand-purple" /> System Alerts
      </h2>
      
      <div className="flex-1 overflow-y-auto pr-2 space-y-3 custom-scrollbar">
        <AnimatePresence>
          {alerts.length === 0 ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-gray-500 text-center py-8">
              No recent alerts system operating normally.
            </motion.div>
          ) : (
            alerts.slice().reverse().map((alert, idx) => (
              <motion.div 
                key={alert.id || idx}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className={`p-3 rounded-lg border ${
                  alert.type === 'emergency' 
                    ? 'bg-brand-red/10 border-brand-red/30 text-red-200' 
                    : 'bg-dark-800/50 border-dark-700 text-gray-300'
                }`}
              >
                <div className="flex items-start gap-3">
                  {alert.type === 'emergency' ? <AlertCircle className="text-brand-red mt-0.5 shrink-0" size={18} /> : <Info className="text-brand-blue mt-0.5 shrink-0" size={18} />}
                  <div>
                    <div className="font-semibold text-sm">{alert.title || (alert.type === 'emergency' ? 'Alert' : 'Info')}</div>
                    <div className="text-xs mt-1 opacity-80 leading-relaxed">{alert.message}</div>
                    {alert.timestamp && <div className="text-[10px] opacity-50 mt-2">{new Date(alert.timestamp).toLocaleTimeString()}</div>}
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
