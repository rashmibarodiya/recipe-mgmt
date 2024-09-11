'use client';
import { useState, useEffect } from "react";
import axios from "axios";
import { Recipe } from "@repo/ui/src/recipeCard";
import RecipeCard from "../components/RecipePreview";
import { useRouter } from 'next/navigation'; 

export default function GetUserRecipe() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const router = useRouter();

  const handleClick = (id: string) => {
    router.push(`/getRecipe/${id}`);
  }

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await axios.get('/api/getUserRecipe');
        console.log("this is react", res.data);
        setRecipes(res.data.recipes);
      } catch (e) {
        console.error(e);
      }
    };

    fetchRecipes();
  }, []);

  return (
    <div className="font-bold text-black pt-4 px-4">
      <h1 className="text-3xl font-bold text-center mb-6">Your Recipes</h1>
      <div className="ml-10 mr-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe, index) => (
          <div
            key={index}
            className="p-4 cursor-pointer"
            onClick={() => handleClick(recipe._id || '0')}
          >
            <RecipeCard recipe={recipe} />
          </div>
        ))}
      </div>
    </div>
  );
}
