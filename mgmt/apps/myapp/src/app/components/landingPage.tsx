
"use client"
import CategoryDisplay from "./CategoryDisplay";
import { signIn, useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
export default function LandingPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const img =
    "https://media.istockphoto.com/id/1190330112/photo/fried-pork-and-vegetables-on-white-background.jpg?s=612x612&w=0&k=20&c=TzvLLGGvPAmxhKJ6fz91UGek-zLNNCh4iq7MVWLnFwo=";
  const italian =
    "https://st2.depositphotos.com/1326558/7226/i/450/depositphotos_72263189-stock-photo-penne-pasta-in-tomato-sauce.jpg";
  const img3 = "https://slurrp.club/wp-content/uploads/2021/10/DSC_0037-2.jpg";
  const dessert =
    "https://img.freepik.com/free-photo/homemade-roasted-plum-ice-cream-recipe-food-photography_53876-96019.jpg?w=996&t=st=1726297575~exp=1726298175~hmac=9396b7e1326da8104c656c2e60d95d0cba4c52853b58ab24b5eefd733c544607";
  const chinese =
    "https://img.freepik.com/free-photo/pork-meatballs-dark-surface_1150-43612.jpg?w=996&t=st=1726297756~exp=1726298356~hmac=f85a4a1d3fc462e286dd92ee8594184e47f15a333d49248f715916afdb91e0e8";
  return (
    <div>
      {/* Hero Section */}
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
                Whether you're a beginner or a master chef, you'll find
                something delicious to try.
              </p>
              <button
                onClick={() => (session ? router.push("/explore") : router.push("auth/signin"))}
                className="bg-customGold text-gray-800 hover:bg-yellow-500 hover:text-gray-900 font-semibold py-2 px-4 rounded transition-colors duration-300"
              >
                {session ? "Explore" : "Get Started"}
              </button>
            </div>
            <div className="relative flex flex-col items-center mt-10 ml-20 justify-center w-2/5 p-10">
              <img
                src={img3}
                alt="Delicious Dish 1"
                className="absolute w-60 h-60 object-cover rounded-full shadow-md"
                style={{ top: "0", left: "0" }}
              />
              <img
                src={img}
                alt="Delicious Dish 2"
                className="absolute w-60 h-60 object-cover rounded-full shadow-md"
                style={{ top: "90px", left: "90px" }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="text-2xl md:text-4xl text-indigo-950 font-bold text-center text-white 
      bg-gradient-to-r from-red-400 via-red-200 to-red-400 shadow-xl 
      rounded-lg p-6 md:p-8 w-3/4 max-w-4xl mx-auto my-10 transform transition-transform hover:scale-105">
  Select by Category
</div>


      {/* Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6 md:p-14">
        <CategoryDisplay url={italian} category="Vegetarian" />
        <CategoryDisplay url={img} category="Vegan" />
        <CategoryDisplay url={italian} category="Italian" />
        <CategoryDisplay url={chinese} category="Chinese" />
        <CategoryDisplay url={dessert} category="Dessert" />
        <CategoryDisplay url={img3} category="Vegan" />
      </div>
    </div>
  );
}
