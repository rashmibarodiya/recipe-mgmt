"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import HalfRecipe from "../components/halfRecipe";
import Recipe from "../../types/recipe"; // Adjust path as needed
import CategoryDisplay from "../components/Display";

export default function ExplorePage() {
  const [query, setQuery] = useState<string>("");
  const [searchRecipes, setSearchRecipes] = useState<Recipe[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [sortedRecipes, setSortedRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    const fetchSortedRecipes = async () => {
      try {
        const response = await axios.get("/api/sortedRecipes");
        setSortedRecipes(response.data);
      } catch (err) {
        console.error("Error fetching sorted recipes:", err);
        setError("Failed to fetch sorted recipes. Please try again later.");
      }
    };
    fetchSortedRecipes();
  }, []); // Changed to an empty dependency array

  const handleSearch = async () => {
    if (!query.trim()) return; // Don't make a request if the input is empty
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get("/api/searchRecipe", {
        params: { query },
      });
      setSearchRecipes(response.data); // Assume the API returns an array of recipes
    } catch (err) {
      console.error("Error fetching search results:", err);
      setError("Failed to fetch recipes. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Image URLs
  const img = "https://media.istockphoto.com/id/1190330112/photo/fried-pork-and-vegetables-on-white-background.jpg?s=612x612&w=0&k=20&c=TzvLLGGvPAmxhKJ6fz91UGek-zLNNCh4iq7MVWLnFwo=";
  const italian = "https://st2.depositphotos.com/1326558/7226/i/450/depositphotos_72263189-stock-photo-penne-pasta-in-tomato-sauce.jpg";
  const img3 = "https://slurrp.club/wp-content/uploads/2021/10/DSC_0037-2.jpg";
  const dessert = "https://img.freepik.com/free-photo/homemade-roasted-plum-ice-cream-recipe-food-photography_53876-96019.jpg?w=996&t=st=1726297575~exp=1726298175~hmac=9396b7e1326da8104c656c2e60d95d0cba4c52853b58ab24b5eefd733c544607";
  const chinese = "https://img.freepik.com/free-photo/pork-meatballs-dark-surface_1150-43612.jpg?w=996&t=st=1726297756~exp=1726298356~hmac=f85a4a1d3fc462e286dd92ee8594184e47f15a333d49248f715916afdb91e0e8";

  return (
    <div className="p-6 md:p-10 lg:p-14 min-h-screen">
      {/* Hero Section */}
      <div className="flex flex-col items-center bg-orange-100 p-10 shadow-lg text-slate-900 rounded-lg mb-10 w-full max-w-screen-lg mx-auto">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold mt-10 mb-6 text-customGold">
            Explore Delicious Recipes
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Discover a world of flavors and find your next favorite recipe. Use
            the search bar below or browse by category.
          </p>

          <div className="w-full max-w-md mx-auto">
            <div className="flex items-center">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by title, description, or ingredients..."
                className="border border-gray-300 rounded-l p-2 text-black w-full focus:ring-2 focus:ring-customGold transition duration-200"
              />
              <button
                onClick={handleSearch}
                className="bg-customGold text-black hover:text-white p-2 rounded-r hover:bg-yellow-600 transition duration-200"
              >
                Search
              </button>
            </div>
            {loading && (
              <p className="text-center text-gray-500 mt-4">Loading...</p>
            )}
            {error && <p className="text-center text-red-500 mt-4">{error}</p>}
          </div>
        </div>
      </div>

      {/* Search Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {searchRecipes.map((recipe) => (
          <HalfRecipe
            key={recipe._id}
            recipe={recipe}
            id={recipe._id || ""}
            mine={true}
          />
        ))}
      </div>

      {/* Featured Recipes */}
      <div className="mb-10">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Featured Recipes
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {sortedRecipes.map((recipe) => (
            <HalfRecipe
              key={recipe._id}
              recipe={recipe}
              id={recipe._id || ""}
              mine={false}
            />
          ))}
        </div>
      </div>

      {/* Recipe Categories */}
      <div className="mb-10">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Recipe Categories
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <CategoryDisplay url={italian} category="Italian" />
          <CategoryDisplay url={img} category="Vegan" />
          <CategoryDisplay url={italian} category="Vegan" />
          <CategoryDisplay url={chinese} category="Chinese" />
          <CategoryDisplay url={dessert} category="Dessert" />
          <CategoryDisplay url={img3} category="Vegan" />
        </div>
      </div>

      {/* Trending Recipes */}
      <div className="mb-10">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Trending Recipes
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Add your trending recipes here */}
        </div>
      </div>

      {/* Seasonal Recipes */}
      <div className="mb-10">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Seasonal Recipes
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Add your seasonal recipes here */}
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center bg-white py-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Join Our Community
        </h2>
        <p className="text-lg text-gray-600 mb-6">
          Share your own recipes, follow us on social media, and stay updated
          with the latest culinary trends.
        </p>
        <button className="bg-customGold text-gray-800 hover:bg-yellow-500 hover:text-gray-900 font-semibold py-2 px-4 rounded transition-colors duration-300">
          Get Started
        </button>
      </div>
    </div>
  );
}
