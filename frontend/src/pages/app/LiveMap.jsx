import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { Intersection } from '../../components/Intersection';

export const LiveMap = () => {
    const { lanes } = useOutletContext();

    return (
        <div className="p-4 md:p-8 h-full flex flex-col">
            <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-6">Live Intelligence Map</h1>
            <p className="text-gray-500 mb-8 max-w-2xl font-medium">Real-time geospatial rendering of the intersection. Vehicle counts from the AI Vision node are translated into physical rendering coordinates.</p>
            
            <div className="flex-1 w-full flex items-center justify-center max-w-4xl mx-auto">
                <Intersection lanes={lanes} />
            </div>
        </div>
    );
};
