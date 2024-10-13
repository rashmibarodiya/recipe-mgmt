"use client";

import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  className?: string;
  onClick: () => void;
  type?: "button" | "submit" | "reset";
  color?: string;
}

export const Button = ({
  children,
  className,
  onClick,
  type = "button", 
  color
}: ButtonProps) => {
  return (
    <button
      type={type}
      style={{
        backgroundColor: color || "#ec7063",
      }}
      className={`text-white border-none py-2 px-4 rounded-md hover:bg-opacity-75  transition-colors ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
