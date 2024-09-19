import React from 'react';
import Recipe, { RecipeDisplayProps } from '../../types/recipe';  // Adjust the import as necessary
import { Button } from "@repo/ui/src/button";
import { useRouter } from "next/navigation";
import GetRating from './fullRecipe/GetRating';

const HalfRecipe: React.FC<RecipeDisplayProps> = ({ recipe, mine }) => {
  const router = useRouter();

  const handleClick = (id: string) => {
    router.push(`/admin/getRecipe/${id}`);
  };

  const truncateText = (text: string, wordLimit: number) => {
    const words = text.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return text;
  };

  return (
    <div className="max-w-md mx-auto bg-orange-200 rounded-lg shadow-lg overflow-hidden md:max-w-2xl p-6 space-y-4">
      <div onClick={() => handleClick(recipe._id || '0')}>
        <div>
          <img src={recipe.image} alt={recipe.title} className="w-full h-48 mb-4 object-cover rounded-t-lg" />
        </div>
        <div>
          <h3 className="text-2xl font-semibold text-gray-600">{recipe.title}</h3>
          <p className="text-sm text-gray-600 mt-1">{truncateText(recipe.description, 10)}</p>
        </div>  
        <GetRating recipe={recipe} />
      </div>

      <div className="text-gray-600">
        {/* Conditionally render the author or the Edit button */}
        {!mine ? (
          <>
            <span className="font-bold">Author:</span>
            <span className="ml-2">{recipe.authorName}</span>
          </>
        ) : (
          <Button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700" onClick={() => router.push(`/admin/editRecipe/${recipe._id}`)}>
            Edit Recipe
          </Button>
        )}
      </div>
    </div>
  );
};

export default HalfRecipe;
