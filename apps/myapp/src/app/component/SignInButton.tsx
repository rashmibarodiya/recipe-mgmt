// components/SignInButton.tsx
"use client";
import Image from "next/image";
import styles from "./page.module.css";

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
    <div>
    <button
      className="w-48 p-2 py-2 text-black rounded-md bg-transparent hover:bg-green-600 hover:text-white transition-colors duration-300 ease-in-out"
      onClick={() => signIn(providerId)}
    >
       {/* <img
      src={img}
      alt={providerName}
      className="h-6 w-6 rounded-full"
    /> */}
    <Image
              className={styles.logo}
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Deploy now
        <span>Sign in with {providerName}</span>
      
    </button>
    <div className="flex items-center justify-center space-x-2">
   
    </div>
    </div>
  );
}
