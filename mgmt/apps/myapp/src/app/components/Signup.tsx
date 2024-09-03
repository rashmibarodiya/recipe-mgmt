"use client";

import { signIn, useSession, signOut } from "next-auth/react";

export default function Signup() {
  const { data: session } = useSession();
  console.error("signup " +session);
  return (
    <div style={{ height: 60, background: "black", padding: 10 }}>
      {session ? (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          
            {session.user?.name}
        
          <div>
            <button onClick={() => signOut()}>
              Logout
            </button>
          </div>
        </div>
      ) : (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          
            Coursera
       
          <div>
            <button  onClick={() => signIn()}>
              Sign up
            </button>
          </div>
        </div>
      )}
    </div>
  );
}