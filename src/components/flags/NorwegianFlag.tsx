
import React from 'react';

const NorwegianFlag: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => {
  return (
    <div className={`${className} rounded-full overflow-hidden shadow-md border-2 border-white/20 flex-shrink-0`}>
      <svg 
        className="w-full h-full" 
        viewBox="0 0 24 24" 
        xmlns="http://www.w3.org/2000/svg"
        style={{ colorScheme: 'light', imageRendering: 'auto' }}
      >
        <defs>
          <clipPath id="circle-clip-no">
            <circle cx="12" cy="12" r="12" />
          </clipPath>
        </defs>
        
        <g clipPath="url(#circle-clip-no)">
          {/* Red background */}
          <rect width="24" height="24" fill="#EF2B2D" />
          
          {/* White cross */}
          <rect x="8" y="0" width="4" height="24" fill="#FFFFFF" />
          <rect x="0" y="10" width="24" height="4" fill="#FFFFFF" />
          
          {/* Blue cross */}
          <rect x="9" y="0" width="2" height="24" fill="#002868" />
          <rect x="0" y="11" width="24" height="2" fill="#002868" />
        </g>
      </svg>
    </div>
  );
};

export default NorwegianFlag;
