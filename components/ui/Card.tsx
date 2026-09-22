import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({ children, className = '', onClick }) => {
  const baseClasses = "bg-[#313435] border border-[#d0d03d]/30 rounded-lg shadow-lg p-6 transition-all duration-300 ease-in-out";
  return (
    <div className={`${baseClasses} ${className}`} onClick={onClick}>
      {children}
    </div>
  );
};

export default Card;
