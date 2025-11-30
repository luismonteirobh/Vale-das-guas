import React from 'react';

export const Logo: React.FC<{ className?: string }> = ({ className = "w-72" }) => {
  return (
    <div className={`select-none inline-block ${className}`}>
      <svg 
        viewBox="0 0 500 350" 
        className="w-full h-auto drop-shadow-lg"
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="orangeGradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#FDC800"/>
            <stop offset="100%" stopColor="#F7941D"/>
          </linearGradient>
          <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#00AEEF"/>
            <stop offset="100%" stopColor="#005C99"/>
          </linearGradient>
        </defs>

        {/* Group centered in the new expanded viewbox */}
        <g transform="translate(250, 140)">
            
            {/* Orange Arch (Top Sun/Rainbow) */}
            <path 
              d="M -80 -20 A 90 90 0 0 1 90 -10" 
              stroke="url(#orangeGradient)" 
              strokeWidth="24" 
              strokeLinecap="round" 
              fill="none"
            />

            {/* Pink Arch (Right Intersecting Ring) */}
             <path 
              d="M 80 -10 A 60 60 0 0 1 120 60" 
              stroke="#EC008C" 
              strokeWidth="22" 
              strokeLinecap="round" 
              fill="none"
            />

            {/* Green Leaf (Bottom Left) */}
            <path 
              d="M -120 60 Q -60 10, -10 60 Q -40 100, -130 80 Z" 
              fill="#6BBF46"
            />
            
            {/* Blue Wave (Main Central Shape) */}
            <path 
              d="M -100 40 
                 C -70 -50, 80 -70, 145 10
                 L 135 35
                 C 90 85, -10 85, -50 50 
                 C -70 35, -95 45, -100 40 Z" 
              fill="url(#blueGradient)"
            />
        </g>
        
        {/* Text Labels - Centered */}
        <text x="250" y="275" textAnchor="middle" fill="#005C99" fontSize="52" style={{ fontFamily: 'Montserrat', fontWeight: 900, letterSpacing: '-2px' }}>
          VALE DAS ÁGUAS
        </text>
        <text x="250" y="315" textAnchor="middle" fill="#007BC0" fontSize="18" style={{ fontFamily: 'Montserrat', fontWeight: 700, letterSpacing: '6px' }}>
          THERMAS PARK
        </text>
      </svg>
    </div>
  );
};