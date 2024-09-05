"use client";

import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  className?: string;
  onClick: () => void; // Custom onClick function prop
  type?: "button" | "submit" | "reset"; // Button type
  color?: string; // Custom button color
}

export const Button = ({
  children,
  className,
  onClick,
  type = "button", // Default type
  color = "#ec7063" // Default color
}: ButtonProps) => {
  return (
    <button
      type={type}
      style={{
        backgroundColor: color,
        color: "white",
        border: "none",
        padding: "8px 16px",
        borderRadius: "4px"
      }}
      className={className}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
