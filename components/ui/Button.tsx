import React from 'react';

type ButtonProps<C extends React.ElementType> = {
  as?: C;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger';
} & React.ComponentPropsWithoutRef<C>;

const Button = <C extends React.ElementType = 'button'>({ as, children, className = '', variant = 'primary', ...props }: ButtonProps<C>) => {
  const Component = as || 'button';
  
  const baseClasses = "flex items-center justify-center py-2 px-4 rounded-lg text-sm font-semibold transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#24292A] transform hover:scale-105";
  
  const variants = {
    primary: "bg-[#d0d03d] text-[#24292A] hover:bg-[#eaea5f] focus:ring-[#d0d03d] hover:shadow-md hover:shadow-[#d0d03d]/40",
    secondary: "bg-transparent border border-[#d0d03d]/70 text-[#d0d03d] hover:bg-[#eaea5f] hover:text-[#24292A] hover:border-[#eaea5f] hover:shadow-md hover:shadow-[#d0d03d]/40 focus:ring-[#d0d03d]",
    danger: "bg-[#313435] border border-red-600/70 text-red-400 hover:bg-red-600/10 hover:border-red-600 focus:ring-red-500"
  };

  return (
    <Component className={`${baseClasses} ${variants[variant]} ${className}`} {...props}>
      {children}
    </Component>
  );
};

export default Button;
