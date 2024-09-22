// components/Button.tsx
import React from 'react';

type ButtonProps = {
  type: 'button' | 'submit' | 'reset';
  color?: string;
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
};

export const Button: React.FC<ButtonProps> = ({ type, color, onClick, className, children }) => {
  const colorClasses =`bg-${color}-700 text-white hover:bg-green-600`
    // color === 'green'
    //   ? `bg-${color}-700 text-white hover:bg-green-600`
    //   : 'bg-red-700 text-white hover:bg-red-600';

  return (
    <button
      type={type}
      onClick={onClick}
      className={`font-semibold py-2 px-4 rounded-md shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 ${className}`}
    >
      {children}
    </button>
  );
};
