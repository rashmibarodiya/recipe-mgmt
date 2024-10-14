
"use client"
import { useState } from 'react';
import axios from 'axios';
import HalfRecipe from "../components/halfRecipe"
import Recipe from "../../types/recipe"
// interface Recipe {
//   _id: string;
//   title: string;
//   description: string;
//   ingredients: string[];
//   category: string;
// }

export default function SearchPage() {
  const [query, setQuery] = useState<string>('');
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSearch = async () => {
    if (!query.trim()) return; // Don't make a request if the input is empty
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get('/api/searchRecipe', {
        params: { query }
      });
      setRecipes(response.data); // Assume the API returns an array of recipes
    } catch (err) {
      console.error('Error fetching search results:', err);
      setError('Failed to fetch recipes. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Search Recipes</h1>

      <div className="flex mb-6">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by title, description, or ingredients..."
          className="border p-2 rounded text-black w-full"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white p-2 rounded ml-2 hover:bg-blue-600"
        >
          Search
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {recipes.map((recipe) => (
  <HalfRecipe key={recipe._id} recipe={recipe} id={recipe._id || ""} mine={true} />
))}

      </div>
    </div>
  );
}
