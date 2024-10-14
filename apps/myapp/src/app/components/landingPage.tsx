"use client";
import GetCategories from "./categoryMg/categories";
import { signIn, useSession, signOut } from "next-auth/react";
import { Bevan } from "next/font/google";
import { useRouter } from "next/navigation";
import Image from "next/image";


export default function LandingPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const img ="https://media.istockphoto.com/id/1190330112/photo/fried-pork-and-vegetables-on-white-background.jpg?s=612x612&w=0&k=20&c=TzvLLGGvPAmxhKJ6fz91UGek-zLNNCh4iq7MVWLnFwo=";
 const img3 = "https://slurrp.club/wp-content/uploads/2021/10/DSC_0037-2.jpg";

   return (
    <div>
      
      <div className="flex items-center min-h-screen bg-peach bg-cover bg-center">
        <div className="flex w-full h-full md:w-3/4 lg:w-full p-20 text-slate-100">
          {/* Outer pink container */}
          <div className="flex justify-center w-2/3 h-full p-10 bg-red-100 shadow-lg text-slate-900 rounded-lg">
            <div className="flex-1">
              <h1 className="text-6xl font-bold mt-10 mb-6 text-customGold">
                Welcome to Recipe World
              </h1>
              <p className="text-xl mb-6">
                Discover and share amazing recipes from around the world.
                Whether you{"'"}re a beginner or a master chef, you{"'"}ll find
                something delicious to try.
              </p>
              <button
                onClick={() =>
                  session ? router.push("/explore") : router.push("auth/signin")
                }
                className="bg-yellow-500 text-gray-800 hover:bg-yellow-400 hover:text-gray-900 font-semibold py-2 px-4 rounded transition-colors duration-300"
              >
                {session ? "Explore" : "Get Started"}
              </button>
            </div>
            <div className="relative flex flex-col items-center mt-10 ml-20 justify-center w-2/5 p-10">
              <Image
                src={img3}
                alt="Delicious Dish 1"
                className="absolute w-60 h-60 object-cover rounded-full shadow-md"
                style={{ top: "0", left: "0" }}
              />
              <Image
                src={img}
                alt="Delicious Dish 2"
                className="absolute w-60 h-60 object-cover rounded-full shadow-md"
                style={{ top: "90px", left: "90px" }}
              />
            </div>
          </div>
        </div>
      </div>

      <div
        className="text-2xl md:text-4xl text-indigo-950 font-bold text-center text-white 
      bg-gradient-to-r from-red-400 via-red-200 to-red-400 shadow-xl 
      rounded-lg p-6 md:p-8 w-3/4 max-w-4xl mx-auto my-10 transform transition-transform hover:scale-105"
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
