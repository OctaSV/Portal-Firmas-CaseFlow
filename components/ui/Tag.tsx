import React from 'react';
import { CaseCategory } from '../../types';

interface TagProps {
  children: React.ReactNode;
  category: CaseCategory;
  className?: string;
}

const Tag: React.FC<TagProps> = ({ children, category, className = '' }) => {
  const categoryColors = {
    [CaseCategory.A]: 'bg-[#2D774B] text-green-100',
    [CaseCategory.B]: 'bg-[#d0d03d] text-[#24292A]',
    [CaseCategory.C]: 'bg-[#a13d3d] text-red-100',
  };

  const baseClasses = "px-3 py-1 font-bold rounded-full inline-block";

  return (
    <span className={`${baseClasses} ${categoryColors[category]} ${className}`}>
      {children}
    </span>
  );
};

export default Tag;