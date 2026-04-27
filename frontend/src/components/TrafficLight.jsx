import React from 'react';

export const TrafficLight = ({ color, direction }) => {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="text-sm text-gray-400 uppercase font-bold tracking-widest">{direction}</div>
      <div className="bg-dark-900 p-3 rounded-2xl flex flex-col gap-3 w-20 items-center shadow-inner border border-dark-700">
        <div className={`light-bulb red ${color === 'red' ? 'active' : 'inactive'}`}></div>
        <div className={`light-bulb yellow ${color === 'yellow' ? 'active' : 'inactive'}`}></div>
        <div className={`light-bulb green ${color === 'green' ? 'active' : 'inactive'}`}></div>
      </div>
    </div>
  );
};
