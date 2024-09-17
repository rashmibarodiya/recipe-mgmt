"use client";
import { useParams } from "next/navigation"; // Use this for dynamic params in App Router
import { useEffect, useState } from "react";
import RecipeDisplay from "../../../components/fullRecipeCard";
import Recipe from "@/types/recipe";
import axios from "axios";
import { useSession } from "next-auth/react";
import HalfRecipe from "@/app/components/halfRecipe";

const RecipeDetailPage = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState<Recipe>();
  const { data: session } = useSession();
  const [mine, setMine] = useState(false);
  const [recipes, setRecipes] = useState<Recipe[]>();

  useEffect(() => {
    const fetchRecipe = async () => {
      if (id) {
        try {
          const res = await axios.get(`/api/getRecipe/${id}`); // Fetch recipe by ID
          const fetchedRecipe = res.data.recipe;

          setRecipe(fetchedRecipe);

          // Check if the logged-in user is the author of the recipe
          if (session?.user?.name === res.data.authorName) {
            setMine(true);
          }
          console.log("mine fromm getRecipe page ",mine)

          const userId = fetchedRecipe?.author;
          const res2 = await axios.get(`/api/getData/getUserRecipe/${userId}`);
          setRecipes(res2.data.recipes);
        } catch (error) {
          console.error("Error fetching recipe:", error);
        }
      }
    };

    fetchRecipe();
  }, [id, session]);

  if (!recipe) return <div className="text-black">Loading...</div>;

  return (
    <div className="text-black">
      <div className="text-black"> Recipe ID: {id as string}</div>

      {/* Render RecipeDisplay */}
      <div className="flex1">
        <RecipeDisplay recipe={recipe} mine={mine} id={id as string} />
      </div>

      {/* Conditionally render the recipes array if mine is false */}
      {!mine && recipes && recipes.length > 0 && (
        <div className="flex2">
          {recipes.map((recipe) => (
            <div key={recipe._id}>
              <HalfRecipe recipe={recipe} id={recipe._id || ""} mine={false} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecipeDetailPage;
