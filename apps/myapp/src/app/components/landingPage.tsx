"use client";
import GetCategories from "./categoryMg/categories";
import {  useSession } from "next-auth/react";

import { useRouter } from "next/navigation";


import Image from "next/image";
export default function LandingPage() {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <div>

      <div className="flex items-center bg-cover bg-center">
        <div className="flex w-full h-full lg:w-full  p-4 lg:p-20 text-slate-100">
          {/* Outer pink container */}
          <div className="flex justify-center w-full md:w-2/3 lg:w-2/3 h-full p-10 bg-red-100 shadow-lg text-slate-900 rounded-lg">
            <div className="flex-1">
              <h1 className="md:text-6xl text-3xl font-bold lg:mt-10 mt-6 mb-6 ">
                Welcome to RecipeWorld
              </h1>
              <p className="text-md md:text-lg  mb-6">
                Discover and share amazing recipes from around the world.
                Whether you{"'"}re a beginner or a master chef, you{"'"}ll find
                something delicious to try.
              </p>
              <div className="flex justify-left space-x-4 ">
                
              {!session && (
                <div>
                  <button
                onClick={() =>
                   router.push("auth/signin") 
                }
                className="bg-yellow-500 text-gray-800 hover:bg-yellow-400 hover:text-gray-900
                 font-semibold py-2 px-4 rounded transition-colors duration-300"
              >
              Get Started
              </button>
                </div>
              )}
              
              <button
                onClick={() =>
                   router.push("/explore") 
                }
                className="bg-yellow-500 text-gray-800 hover:bg-yellow-400 hover:text-gray-900 font-semibold py-2 px-4 rounded transition-colors duration-300"
              >
                 Explore
              </button>
              </div>
            </div>
            <div className="relative flex flex-col items-center mt-20 md:mt-10 md:ml-20 justify-center w-2/5 p-10">
              <Image
                src="/download2.jpg"
                alt="Delicious Dish 1"
                width={300}
                height={300}
                className="absolute md:w-40 md:h-40 object-cover rounded-full shadow-md top-0 left-0 z-10"

              />
              <Image
                src="/st3.jpg"
                alt="Delicious Dish 2"
                width={300}
                height={300}
                className="absolute w-30 h-30 md:w-40 md:h-40 object-cover rounded-full shadow-md
                  top-8 left-5 md:top-20 md:left-20 z-10"
              />
            </div>

          </div>
        </div>
      </div>

      <div
        className="text-2xl md:text-4xl text-indigo-950 font-bold text-center text-white 
      bg-gradient-to-r from-red-400 via-red-200 to-red-400 shadow-xl 
      rounded-lg p-6 md:p-8 w-3/4 max-w-4xl mx-auto lg:my-6 transform transition-transform hover:scale-105"
      >
        Select by Category
      </div>

      {/* Cards Section */}
      <div>
        <GetCategories />
      </div>
    </div>
  );
}
