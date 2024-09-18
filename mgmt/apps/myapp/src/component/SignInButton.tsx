// components/SignInButton.tsx
"use client";

import { signIn } from "next-auth/react";
import { Button } from "@repo/ui/src/button";

interface SignInButtonProps {
  providerId: string;
  providerName: string;
}

export function SignInButton({ providerId, providerName }: SignInButtonProps) {
  const img =
    "https://img.freepik.com/free-psd/google-icon-isolated-3d-render-illustration_47987-9777.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1726617600&semt=ais_hybrid";
  return (
    <button
      className="w-48 py-2 text-black rounded-md bg-transparent hover:bg-green-600 hover:text-white transition-colors duration-300 ease-in-out"
      onClick={() => signIn(providerId)}
    >
      <div className="flex items-center justify-center space-x-2">
        <img
          src={img}
          alt={providerName}
          className="h-1/7 w-1/7 rounded-full"
        />
        <span>Sign in with {providerName}</span>
      </div>
    </button>
  );
}
