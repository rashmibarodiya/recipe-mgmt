import React, { useState } from "react";
import Recipe, { RecipeDisplayProps } from "../../types/recipe"; // Adjust the import as necessary
import { Button } from "./Button";
import { useRouter } from "next/navigation";
import GetRating from "./fullRecipe/GetRating";

const HalfRecipe: React.FC<RecipeDisplayProps> = ({ recipe, mine, color, className }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  if (!color) {
    color = "orange-200";
  }

  const handleClick = (id: string) => {
    setLoading(true);  
    router.push(`/admin/getRecipe/${id}`);
  };

  const handleEditClick = (id: string) => {
    setLoading(true);  
    router.push(`/admin/editRecipe/${id}`);
  };

  const truncateText = (text: string, wordLimit: number) => {
    const words = text.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return text;
  };

  return (
    <div
      className={`max-w-md w-full h-full mx-auto rounded-lg shadow-lg
        cursor-pointer overflow-hidden md:max-w-2xl p-6 space-y-4 bg-${color} ${className ? className : ""}`}
    >
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <div
              className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid 
              border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
              role="status"></div>
        </div>
      ) : (
        <>
          <div onClick={() => handleClick(recipe._id || "0")}>
            <div>
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-48 mb-4 object-cover rounded-t-lg"
              />
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-gray-600">
                {recipe.title}
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                {truncateText(recipe.description, 10)}
              </p>
            </div>
            <GetRating recipe={recipe} />
          </div>

          <div className="text-gray-600">
            {!mine ? (
              <>
                <span className="font-bold">Author:</span>
                <span className="ml-2">{recipe.authorName}</span>
              </>
            ) : (
              <Button
                type="button" 
                className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-400"
                onClick={() => handleEditClick(recipe._id || "0")}
              >
                Edit Recipe
              </Button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default HalfRecipe;
