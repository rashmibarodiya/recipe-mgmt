"use client";

import { signIn, useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "./Button";
import HamburgerMenu from "../components/HamburgurMenu"
import { useState } from "react";

export default function Appbar() {
  const { data: session } = useSession();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="h-16 px-10 flex items-center md-20   shadow-md text-black justify-between">
       <HamburgerMenu onToggle={setIsMenuOpen} />
      

      {/* <div className="font-bold text-xl text-customGold"></div> */}
      {session ? (
        <div className="flex items-center justify-between w-full">
          <div className="text-lg ml-4 font-bold text-gray-900 hidden md:flex">
            Welcome, {session?.user?.name}
          </div>
          <div className="space-x-4 hidden md:flex">
            <button
              color="orange"
              className="bg-orange-500 text-white font-semibold py-2 px-4 rounded-md shadow-lg hover:bg-orange-400 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-orange-300"
              // onClick={() => router.push("/")}
              onClick={() => router.push("/")}
            >
              Home
            </button>
            <button
              color="orange"
              className="bg-orange-500 text-white font-semibold py-2 px-4 rounded-md shadow-lg hover:bg-orange-400 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-orange-300"
              onClick={() => router.push("/explore")}
            >
              Explore
            </button>
            <button
              color="orange"
              className="bg-orange-500 text-white font-semibold py-2 px-4 rounded-md shadow-lg hover:bg-orange-400 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-orange-300"
              onClick={() => router.push("/admin/addRecipe")}
            >
              Add Recipe
            </button>
            <button
              color="orange"
              className="bg-orange-500 text-white font-semibold py-2 px-4 rounded-md shadow-lg hover:bg-orange-400 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-orange-300"
              onClick={() => router.push("/admin/getUserRecipe")}
            >
              My Recipes
            </button>
            <button
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-500 transition-colors duration-300"
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
        <div className="flex items-center ml-4 justify-between w-full">
          <div className="font-bold text-cyan-900 text-2xl">
            RecipeWorld

          </div>
         <div className="space-x-4 "> 

          <button
            className=" bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors duration-300"
            onClick={() => signIn()}
          >
            Sign In
          </button>
          <button
              color="orange"
              className="bg-orange-500 text-white font-semibold py-2 px-4 rounded-md shadow-lg hover:bg-orange-400 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-orange-300"
              onClick={() => router.push("/explore")}
            >
              Explore
            </button>
      </div>
        </div>
      )}
    </div>
  );
}
