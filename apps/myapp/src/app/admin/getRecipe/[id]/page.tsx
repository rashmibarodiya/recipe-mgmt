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
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [check, setCheck] = useState(false)

  useEffect(() => {
    const fetchRecipe = async () => {
      if (id) {
        try {
          const res = await axios.get(`/api/getRecipe/${id}`); // Fetch recipe by ID
          const fetchedRecipe = res.data.recipe;

          setRecipe(fetchedRecipe);
          const userId = fetchedRecipe?.author;
          // Check if the logged-in user is the author of the recipe
          if (session?.user?.name === res.data.authorName) {
            setMine(true);
            setCheck(true)
          } else {
            const res2 = await axios.get(
              `/api/getData/getUserRecipe/${userId}`
            );
            setCheck(true)
            setRecipes(res2.data.recipes);
          }
          console.log("mine from getRecipe page ", mine);
        } catch (error) {
          console.error("Error fetching recipe:", error);
        }
      }
    };
    console.log(check)

    fetchRecipe();
  }, [id, check, session, mine]);

  if (!recipe) return <div className="flex text-2xl mt-8 font-bold text-black justify-center">
    <div
      className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid 
                        border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
      role="status"></div>
  </div>;

  return (
    <div className="text-black p-4 sm:p-6 lg:p-8 ">
      {/* <div className="text-lg font-semibold mb-4">Recipe ID: {id as string}</div> */}

      {/* Render RecipeDisplay */}
      <div className="flex justify-left md:ml-10">
        <div className="">
          <RecipeDisplay recipe={recipe} mine={mine} id={id as string} />
        </div>




      </div>

      {/* Conditionally render the recipes array if mine is false */}
      {!mine && check && recipes && recipes.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">More recipes by {recipe?.authorName}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {recipes.map((recipe, index) => (
              <div key={index} className="  shadow-md rounded-lg cursor-pointer hover:shadow-lg transition-shadow duration-300">
                <HalfRecipe recipe={recipe} mine={false} id={recipe._id || ""} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeDetailPage;
