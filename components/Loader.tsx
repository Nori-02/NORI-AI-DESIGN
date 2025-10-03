
import React from 'react';

const Loader: React.FC = () => {
    return (
        <div className="absolute inset-0 bg-gray-900/80 backdrop-blur-sm flex flex-col items-center justify-center z-10 rounded-xl">
            <div className="w-16 h-16 border-4 border-t-purple-500 border-gray-700 rounded-full animate-spin"></div>
            <p className="mt-4 text-lg font-semibold text-gray-200">Generating your masterpiece...</p>
            <p className="text-sm text-gray-400">The AI is warming up its pixels.</p>
        </div>
    );
};

export default Loader;