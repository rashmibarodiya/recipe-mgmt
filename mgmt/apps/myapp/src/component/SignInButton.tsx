// components/SignInButton.tsx
"use client";

import { signIn } from "next-auth/react";
import {Button} from "@repo/ui/button"
interface SignInButtonProps {
  providerId: string;
  providerName: string;
}

export function SignInButton({ providerId, providerName }: SignInButtonProps) {
  return (
    <Button onClick={() => signIn(providerId)}>
      Sign in with {providerName}
    </Button>
  );
}
