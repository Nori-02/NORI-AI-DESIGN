import React, { useState, useRef, useCallback, useEffect } from 'react';
import { ArrowsHorizontalIcon } from './Icons';

interface BeforeAfterSliderProps {
    beforeSrc: string;
    afterSrc: string;
}

const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({ beforeSrc, afterSrc }) => {
    const [sliderPosition, setSliderPosition] = useState(50);
    const [isDragging, setIsDragging] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleMove = useCallback((clientX: number) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
        const percent = (x / rect.width) * 100;
        setSliderPosition(percent);
    }, []);

    const handleMouseDown = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };
    
    const handleTouchStart = (e: React.TouchEvent) => {
        setIsDragging(true);
    };

    const handleMouseUp = useCallback(() => {
        setIsDragging(false);
    }, []);
    
    const handleTouchEnd = useCallback(() => {
        setIsDragging(false);
    }, []);

    const handleMouseMove = useCallback((e: MouseEvent) => {
        if (!isDragging) return;
        handleMove(e.clientX);
    }, [isDragging, handleMove]);
    
    const handleTouchMove = useCallback((e: TouchEvent) => {
        if (!isDragging) return;
        handleMove(e.touches[0].clientX);
    }, [isDragging, handleMove]);

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
        window.addEventListener('touchmove', handleTouchMove);
        window.addEventListener('touchend', handleTouchEnd);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('touchmove', handleTouchMove);
            window.removeEventListener('touchend', handleTouchEnd);
        };
    }, [handleMouseMove, handleMouseUp, handleTouchMove, handleTouchEnd]);

    return (
        <div 
            ref={containerRef} 
            className="relative w-full h-full select-none cursor-ew-resize overflow-hidden rounded-lg group"
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
        >
            {/* Before Image */}
            <img
                src={beforeSrc}
                alt="Before"
                className="absolute inset-0 w-full h-full object-contain pointer-events-none"
            />
            {/* After Image (Clipped) */}
            <div
                className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none"
                style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
            >
                <img
                    src={afterSrc}
                    alt="After"
                    className="absolute inset-0 w-full h-full object-contain pointer-events-none"
                />
            </div>

            {/* Labels */}
            <div className="absolute top-2 left-2 bg-black/60 text-white text-xs font-bold px-2 py-1 rounded-full pointer-events-none transition-opacity duration-300 opacity-0 group-hover:opacity-100">
                BEFORE
            </div>
             <div className="absolute top-2 right-2 bg-black/60 text-white text-xs font-bold px-2 py-1 rounded-full pointer-events-none transition-opacity duration-300 opacity-0 group-hover:opacity-100">
                AFTER
            </div>

            {/* Slider Handle */}
            <div
                className="absolute top-0 bottom-0 w-1 bg-white/50 backdrop-blur-sm pointer-events-none transform -translate-x-1/2 transition-all duration-100"
                style={{ left: `${sliderPosition}%` }}
            >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-800 shadow-2xl transition-transform duration-300 group-hover:scale-110">
                    <ArrowsHorizontalIcon className="w-6 h-6" />
                </div>
            </div>
        </div>
    );
};

export default BeforeAfterSlider;