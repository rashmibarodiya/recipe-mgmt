"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import HalfRecipe from "../components/halfRecipe";
import Recipe from "../../types/recipe";
import GetCategories from "../components/categoryMg/categories";
import { useRouter } from "next/navigation";
import { signIn, useSession, signOut } from "next-auth/react";
import Image from "next/image";

export default function ExplorePage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [query, setQuery] = useState<string>("");
  const [searchRecipes, setSearchRecipes] = useState<Recipe[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [sortedRecipes, setSortedRecipes] = useState<Recipe[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [skip, setSkip] = useState<number>(0);
  const limit = 6;
  const [isFetching, setIsFetching] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);


  const fetchSortedRecipes = async () => {
    if (isFetching) return;
    setIsFetching(true);
    setLoading(true);

    try {
      const response = await axios.get("/api/sortedRecipes", {
        params: { skip, limit },
      });
      setSkip(skip + limit);
      const newRecipes = response.data;

      if (newRecipes.length < limit) {
        setHasMore(false);
      }

      setSortedRecipes((prevRecipes) => [...prevRecipes, ...newRecipes]);
    } catch (err) {
      console.error("Error fetching sorted recipes:", err);
      setError("Failed to fetch sorted recipes. Please try again later.");
    } finally {
      setIsFetching(false);
      setLoading(false);
    }
  };
 
  const handleSearch = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get("/api/searchRecipe", { params: { query } });
      setSearchRecipes(response.data);
    } catch (err) {
      console.error("Error fetching search results:", err);
      setError("Failed to fetch recipes. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isClient && !isFetching && sortedRecipes.length === 0 && !loading) {
      fetchSortedRecipes();
    }
  }, [isClient, sortedRecipes.length, loading, isFetching, fetchSortedRecipes]);


  return (
    <div className="p-6 md:p-10 lg:p-14 min-h-screen">
      <div className="flex flex-col items-center bg-orange-100 p-6 shadow-lg text-slate-900 rounded-lg mb-10 mt-18 w-full h-full md:h-96 max-w-screen-lg mx-auto">
        <h1 className="text-3xl md:text-6xl font-bold  md:mt-10 mb-6 text-customGold text-center">
          Explore Delicious Recipes :{")"}
        </h1>
        <p className="md:text-lg text-gray-700 text-center">
          Uncover new culinary adventures and indulge in unique flavors. Start by exploring categories or find inspiration with the search below.
        </p>

        <div className="w-full mt-8 max-w-md mx-auto">
          <div className="flex ">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by title, description, or ingredients..."
              className="border rounded-l p-2 w-full text-black focus:ring-2 focus:ring-customGold transition duration-200"
            />
            <button
              onClick={handleSearch}
              className="bg-blue-600 px-4 rounded-r hover:bg-blue-500 transition duration-200"
            >
             <Image src="/search.svg" alt="search " width = {25} height = {25}/>
            </button>
          </div>
          {loading && <p className="text-center text-gray-500 mt-4">Loading...</p>}
          {error && <p className="text-center text-red-500 mt-4">{error}</p>}
        </div>
      </div>

      {searchRecipes.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {searchRecipes.map((recipe) => (
            <HalfRecipe key={recipe._id} recipe={recipe} className="bg-amber-100" id={recipe._id || ""} mine={true} />
          ))}
        </div>
      )}

      <div className="mt-20">
        <h2 className="text-3xl font-bold ml-14 text-gray-800">Recipe Categories</h2>
        <GetCategories />
      </div>

      <div className="mb-10">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Featured Recipes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {sortedRecipes.map((recipe) => (
            <HalfRecipe
              key={recipe._id}
              recipe={recipe}
              id={recipe._id || ""}
              mine={false}
              color="red-100"
              className="h-full"
            />
          ))}
        </div>

        {hasMore && (
          <div className="flex justify-center mt-8">
            <button
              onClick={fetchSortedRecipes}
              className="bg-yellow-500 text-gray-800 hover:bg-yellow-400 font-semibold py-2 px-4 rounded transition-colors duration-300"
            >
              Load More
            </button>
          </div>
        )}
      </div>

      <div className="text-center">
        <p className="text-2xl md:text-3xl font-semibold text-slate-900 my-10">
          Ready to share your recipes?
        </p>
        <button
          onClick={() =>
            session ? router.push("/admin/addRecipe") : router.push("auth/signin")
          }
          className="bg-green-600 hover:bg-green-500 text-white px-6 py-3 text-lg rounded-lg">


          {session ? "Add your Recipe" : "Get Started"}
        </button>
      </div>
    </div>
  );
}
