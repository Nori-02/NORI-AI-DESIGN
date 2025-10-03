import React from 'react';

// FIX: Replaced the generic TomatoIcon with a new SmilingTomatoIcon for better branding.
export const SmilingTomatoIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        {/* Stem */}
        <path d="M12,2c-1.38,0-2.5,0.45-2.5,1.5S10.62,5,12,5s2.5-0.45,2.5-1.5S13.38,2,12,2z" />
        {/* Body with Face */}
        <path d="M18.88,8.22C17.42,6.33,14.88,5,12,5s-5.42,1.33-6.88,3.22C3.12,10.1,2,12.53,2,15.2C2,19.5,6.5,23,12,23 s10-3.5,10-7.8C22,12.53,20.88,10.1,18.88,8.22z M8.5,14C7.67,14,7,13.33,7,12.5S7.67,11,8.5,11S10,11.67,10,12.5S9.33,14,8.5,14z M12,19.5c-2.33,0-4.31-1.46-5.11-3.5h10.22C16.31,18.04,14.33,19.5,12,19.5z M15.5,14c-0.83,0-1.5-0.67-1.5-1.5 S14.67,11,15.5,11S17,11.67,17,12.5S16.33,14,15.5,14z" />
    </svg>
);


// FIX: Added missing CameraIcon component
export const CameraIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.174C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.174 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.776 48.776 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
    </svg>
);

// FIX: Added missing SunIcon component
export const SunIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
    </svg>
);

// FIX: Added missing CubeTransparentIcon component
export const CubeTransparentIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
    </svg>
);

// FIX: Added missing WandIcon component
export const WandIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.475 2.118 3.375 3.375 0 0 0-1.18 2.262c-.072.534.242.966.634 1.148.418.198.851.135 1.186-.105.335-.24.562-.63.562-1.037.0-.444-.13-1.012-.34-1.536a3.001 3.001 0 0 0-2.196-2.196c-.524-.21-1.092-.34-1.536-.34-.407 0-.797.227-1.037.562-.24.335-.303.768-.105 1.186.182.392.614.71 1.148.634.626-.078 1.148-.34 1.536-.634a3.375 3.375 0 0 0 2.262-1.18 2.25 2.25 0 0 1 2.118-2.475 3 3 0 0 0 1.128-5.78 3 3 0 0 0-5.78 1.128zM12.232 4.232a2.86 2.86 0 0 0-4.045 4.045l1.523-1.523a.75.75 0 0 1 1.061 1.06l-1.523 1.523a2.86 2.86 0 0 0 4.045 4.045l4.045-4.045a2.86 2.86 0 0 0-4.045-4.045l-1.523 1.523a.75.75 0 0 1-1.061-1.06l1.523-1.523z" />
    </svg>
);

// FIX: Added missing ArrowsExpandIcon component
export const ArrowsExpandIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
    </svg>
);

// FIX: Added missing LayersIcon component
export const LayersIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.115 5.19a.75.75 0 1 0-1.23 0a.75.75 0 0 0 1.23 0ZM6.115 5.19a.75.75 0 1 1-1.23 0a.75.75 0 0 1 1.23 0ZM6.115 5.19v13.62a.75.75 0 0 0 .75.75h12a.75.75 0 0 0 .75-.75V5.19a.75.75 0 0 0-.75-.75H6.865a.75.75 0 0 0-.75.75ZM6.115 5.19h-1.48a.75.75 0 0 0-.75.75v13.62a.75.75 0 0 0 .75.75h12a.75.75 0 0 0 .75-.75V5.19a.75.75 0 0 0-.75-.75h-1.48m-14.25 0h14.25" />
    </svg>
);

// FIX: Added missing SlashIcon component
export const SlashIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.5l16.5 15" />
    </svg>
);

// FIX: Added missing UserIcon component
export const UserIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
    </svg>
);

// FIX: Added missing CogIcon component
export const CogIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.24-.438.613-.438.995s.145.755.438.995l1.003.827c.48.398.668 1.03.26 1.431l-1.296 2.247a1.125 1.125 0 0 1-1.37.49l-1.217-.456c-.355-.133-.75-.072-1.075.124a6.57 6.57 0 0 1-.22.127c-.331.184-.581.496-.645.87l-.213 1.281c-.09.543-.56.94-1.11.94h-2.593c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.063-.374-.313-.686-.645-.87a6.52 6.52 0 0 1-.22-.127c-.324-.196-.72-.257-1.075-.124l-1.217.456a1.125 1.125 0 0 1-1.37-.49l-1.296-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.437-.995s-.145-.755-.437-.995l-1.004-.827a1.125 1.125 0 0 1-.26-1.431l1.296-2.247a1.125 1.125 0 0 1 1.37-.49l1.217.456c.355.133.75.072 1.075-.124a6.553 6.553 0 0 1 .22-.127c.332-.184.582-.496.645-.87l.213-1.281Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
    </svg>
);

// FIX: Added missing ChevronDownIcon component
export const ChevronDownIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
    </svg>
);

// FIX: Added missing ArrowsHorizontalIcon component
export const ArrowsHorizontalIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h18m-7.5-1.5L21 9m0 0L16.5 4.5M21 9H3" />
    </svg>
);

export const SparklesIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z" />
    </svg>
);

export const WifiOffIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21.75a9.75 9.75 0 1 0 0-19.5 9.75 9.75 0 0 0 0 19.5Zm0-16.5c-2.41 0-4.68.86-6.49 2.3A15.4 15.4 0 0 1 12 6c4.08 0 7.76 1.58 10.49 4.15-1.81-1.44-4.08-2.3-6.49-2.3Zm0 4.5c-1.39 0-2.7.4-3.83 1.08A11.01 11.01 0 0 1 12 10.5c2.32 0 4.46.68 6.22 1.83-1.12-.68-2.43-1.08-3.82-1.08Zm0 4.5a6.22 6.22 0 0 0-4.95 2.25A6.22 6.22 0 0 0 12 19.5a6.22 6.22 0 0 0 4.95-2.25A6.22 6.22 0 0 0 12 15Zm0 3a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5Zm-9.3-8.85.01-.01L3.3 6.75l17.4 17.4-.01.01" />
    </svg>
  );