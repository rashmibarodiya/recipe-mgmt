// components/SignInButton.tsx
"use client";

import { signIn } from "next-auth/react";

import {Button} from "@repo/ui/src/button"
interface SignInButtonProps {
  providerId: string;
  providerName: string;
}

export function SignInButton({ providerId, providerName }: SignInButtonProps) {
  return (
    <button className="w-48 py-2 text-black rounded-md bg-transparent hover:bg-green-600 hover:text-white transition-colors duration-300 ease-in-out"
      onClick={() => signIn(providerId)}>
      Sign in with {providerName}
    </button>
  );
}
