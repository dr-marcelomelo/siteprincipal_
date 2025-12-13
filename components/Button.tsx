import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'white';
  fullWidth?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  fullWidth = false,
  children,
  className = '',
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center px-2.5 py-1 text-[11px] md:px-8 md:py-3 md:text-lg font-medium transition-all duration-300 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variants = {
    primary: "bg-gold-medium hover:bg-gold-dark text-white shadow-lg hover:shadow-xl focus:ring-gold-medium",
    outline: "bg-transparent border-2 border-gold-medium text-gold-medium hover:bg-gold-medium hover:text-white focus:ring-gold-medium",
    white: "bg-white text-gold-dark hover:bg-neutral-50 shadow-md focus:ring-white"
  };

  const widthClass = fullWidth ? "w-full" : "";

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${widthClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;