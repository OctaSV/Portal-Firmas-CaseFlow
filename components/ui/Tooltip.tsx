import React from 'react';

interface TooltipProps {
  children: React.ReactNode;
  content: string;
}

const Tooltip: React.FC<TooltipProps> = ({ children, content }) => {
  return (
    <div className="relative flex items-center group">
      {children}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max max-w-xs
                      bg-[#404344] text-white text-xs rounded-md py-1.5 px-3
                      opacity-0 group-hover:opacity-100 transition-opacity duration-300
                      pointer-events-none shadow-lg border border-[#d0d03d]/50 z-20">
        {content}
        <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0
                        border-x-4 border-x-transparent
                        border-t-4 border-t-[#404344]"></div>
      </div>
    </div>
  );
};

export default Tooltip;