"use client";

import { signIn, useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@repo/ui/src/button";
// import { userName } from "@repo/store/src/atom/username";
// import {  useRecoilState } from "recoil";

export default function Appbar() {
  const { data: session } = useSession();
  //const [username,setUsername] = useRecoilState(userName);
  // if(session?.user?.name){
  //   setUsername(session.user.name)
  // }
  const router = useRouter();

  return (
    <div className="h-16 px-10 flex items-center text-black justify-between">
      {session ? (
        <div className="flex items-center justify-between w-full">
          <div className="font-bold text-xl">Welcome, {session?.user?.name}</div>
          <div className="space-x-4">
            <Button
              color="orange"
              className="hover:bg-red-800 transition-colors duration-300"
              onClick={() => router.push("/admin/addRecipe")}
            >
              Add Recipe
            </Button>
            <Button
              color="orange"
              className="hover:bg-orange-600 transition-colors duration-300"
              onClick={() => router.push("/admin/getUserRecipe")}
            >
              My Recipes
            </Button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors duration-300"
              onClick={() => {
                signOut({ callbackUrl: "/" });
                router.push("/");
              }}
            >
              Logout
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between text-black w-full">
          <div className="font-bold text-xl">Recipes</div>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors duration-300"
            onClick={() => signIn()}
          >
            Sign In
          </button>
        </div>
      )}
    </div>
  );
}
