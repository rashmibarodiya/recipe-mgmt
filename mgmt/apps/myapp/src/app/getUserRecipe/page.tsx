
'use client'
import { useState, useEffect } from "react";
import axios from "axios";
import RecipeDisplay, { Recipe } from "@repo/ui/src/recipeCard"
export default function getUserRecipe() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await axios.get('/api/getUserRecipe');
        console.log("this is react", res.data)
        setRecipes(res.data.recipes); // assuming the API returns a list of recipes
      } catch (e) {
        console.error(e);
      }
    };

    fetchRecipes();
  }, []);
  return (
    <div className = "font-bold ">
      fndkjjfh
      {/* {recipes.map((recipe, index) => (
        <div key={index} className="max-w-md mx-auto bg-yellow-500 text-red-500">
          <RecipeDisplay recipe={recipe} />
        </div>
      ))} */}
    </div>
  );
  
}
