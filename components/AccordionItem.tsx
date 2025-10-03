import React, { useState } from 'react';
import { ChevronDownIcon } from './Icons';

interface AccordionItemProps {
    title: string;
    icon: React.ReactNode;
    children: React.ReactNode;
    isOpenDefault?: boolean;
    isDisabled?: boolean;
    disabledReason?: string;
    isAnalyzing?: boolean;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ title, icon, children, isOpenDefault = false, isDisabled = false, disabledReason = '', isAnalyzing = false }) => {
    const [isOpen, setIsOpen] = useState(isOpenDefault);

    const effectiveIsOpen = isOpen && !isDisabled;

    return (
        <div className={`border-b border-gray-800 ${isDisabled ? 'opacity-50' : ''}`} title={isDisabled ? disabledReason : undefined}>
            <button
                onClick={() => !isDisabled && setIsOpen(!isOpen)}
                className={`w-full flex justify-between items-center p-4 text-left font-semibold text-gray-200 transition-colors ${isDisabled ? 'cursor-not-allowed' : 'hover:bg-gray-800/50'} ${isAnalyzing ? 'animate-pulse-slow' : ''}`}
                aria-expanded={effectiveIsOpen}
                disabled={isDisabled}
            >
                <div className="flex items-center gap-3">
                    {icon}
                    <span>{title}</span>
                    {isAnalyzing && (
                         <div className="w-4 h-4 border-2 border-t-purple-400 border-gray-600 rounded-full animate-spin"></div>
                    )}
                </div>
                <ChevronDownIcon className={`w-5 h-5 transition-transform duration-300 text-gray-500 ${effectiveIsOpen ? 'rotate-180' : ''}`} />
            </button>
            <div 
                className={`grid transition-all duration-300 ease-in-out ${effectiveIsOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
            >
                <div className="overflow-hidden">
                   <div className="p-4 pt-0">
                     {children}
                   </div>
                </div>
            </div>
        </div>
    );
};

export default AccordionItem;
