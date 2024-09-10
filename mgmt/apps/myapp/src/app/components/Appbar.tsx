"use client";

import { signIn, useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@repo/ui/src/button";
export default function Appbar() {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    // <div style={{ height: 60, background: "white", padding: 10, boxShadow: "0px 4px 2px -2px gray" }}>
    <div style={{ height: 60, padding: 40 }}>
      {session ? (
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontWeight: "bold" }}>
            Welcome, {session.user?.name}
          </div>
          <div style={{ fontWeight: "bold" }}>
            <Button color="orange" onClick={() => { router.push("/addRecipe") }}>Add Recipe</Button>
          </div>
          <div style={{ fontWeight: "bold" }}>
            <Button color="orange" onClick={() => { router.push("/getUserRecipe") }}>MyRecipes</Button>
          </div>
          <button

            style={{ backgroundColor: "#f56c6c", color: "white", border: "none", padding: "8px 16px", borderRadius: "4px" }}
            onClick={() => {
              signOut({ callbackUrl: "/" });
              router.push("/");
            }}
          >
            Logout
          </button>
        </div>
      ) : (
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontWeight: "bold" }}>
            Coursera
          </div>
          <button
            style={{ backgroundColor: "#4caf50", color: "white", border: "none", padding: "8px 16px", borderRadius: "4px" }}
            onClick={() => signIn()}
          >
            Sign In
          </button>
        </div>
      )}
    </div>
  );
}
