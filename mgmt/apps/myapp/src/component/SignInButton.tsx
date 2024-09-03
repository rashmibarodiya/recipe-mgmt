// components/SignInButton.tsx
"use client";

import { signIn } from "next-auth/react";

interface SignInButtonProps {
  providerId: string;
  providerName: string;
}

export function SignInButton({ providerId, providerName }: SignInButtonProps) {
  return (
    <button onClick={() => signIn(providerId)}>
      Sign in with {providerName}
    </button>
  );
}
