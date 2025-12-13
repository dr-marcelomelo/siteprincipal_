import React from 'react';

const LoadingSpinner = () => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-deepBlack">
            <div className="flex flex-col items-center gap-4">
                {/* Animated Scales of Justice or similar simple loader */}
                <div className="relative w-16 h-16">
                    <div className="absolute top-0 left-0 w-full h-full border-4 border-neutral-800 rounded-full"></div>
                    <div className="absolute top-0 left-0 w-full h-full border-4 border-gold-medium rounded-full border-t-transparent animate-spin"></div>
                </div>
                <p className="text-gold-medium font-serif animate-pulse">Carregando...</p>
            </div>
        </div>
    );
};

export default LoadingSpinner;
