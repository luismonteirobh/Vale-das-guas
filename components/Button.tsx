import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  className = '',
  ...props 
}) => {
  const baseStyles = "py-3 px-5 rounded-2xl font-bold text-base transition-all duration-300 transform hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:pointer-events-none shadow-md";
  
  const variants = {
    primary: "bg-vale-orange text-white hover:bg-orange-500 hover:shadow-lg hover:shadow-orange-300/50",
    secondary: "bg-vale-blue text-white hover:bg-cyan-600 hover:shadow-lg hover:shadow-cyan-300/50",
    outline: "bg-white border-2 border-vale-blue text-vale-blue hover:bg-vale-light-blue",
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};