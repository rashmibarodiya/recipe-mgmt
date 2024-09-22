// components/SignInButton.tsx
"use client";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { Button } from "@repo/ui/src/button";

interface SignInButtonProps {
  providerId: string;
  providerName: string;
}

export function SignInButton({ providerId, providerName }: SignInButtonProps) {
  return (
    <div>
      <button
        className="w-64 p-2 py-2 text-black border-2 border-black rounded-lg bg-transparent hover:bg-green-600 hover:text-white transition-all duration-300 ease-in-out shadow-md hover:shadow-lg"
        onClick={() => signIn(providerId)}
      >
        <div className="flex items-center justify-center space-x-2"> {/* Flexbox to align text and image inline */}
          <Image
            src="/google.svg"
            alt="google logomark"
            width={25}
            height={25}
          />
          <span>Continue with {providerName}</span>
        </div>
      </button>
    </div>
  );
}
