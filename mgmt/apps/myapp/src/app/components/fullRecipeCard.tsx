import React, { useState, useEffect } from "react";
import { RecipeDisplayProps } from "@/types/recipe";
import CommentService from "./fullRecipe/DisplayComment";
import AddRating from "./fullRecipe/AddRating";
import GetRating from "./fullRecipe/GetRating";
import { useSession } from "next-auth/react";

const RecipeDisplay: React.FC<RecipeDisplayProps> = ({ recipe, id }) => {
  const { data: session } = useSession();
  const [mine, setMine] = useState(false);

  useEffect(() => {
    if (session?.user?.name === recipe.authorName) {
      setMine(true);
    }
  }, [session, recipe.authorName]);

  return (
    <div className="py-10 text-black">
      <div className="max-w-3xl mx-auto bg-gray-100 rounded-lg border-8 border-customRed shadow-lg overflow-hidden">
        <div className="flex flex-col md:flex-row items-center bg-customRed p-6">
          {/* Recipe Image */}
          <div className="flex-shrink-0">
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-32 h-32 md:w-48 md:h-48 rounded-full border-4 border-gray-300 object-cover"
            />
          </div>

          {/* Recipe Info */}
          <div className="mt-4 md:mt-0 md:ml-6 text-center md:text-left w-full">
            <h3 className="text-3xl md:text-4xl font-bold text-white">
              {recipe.title}
            </h3>
            <p className="text-lg text-gray-300 mt-2">{recipe.description}</p>

            {/* Rating Component */}
            <div className="mt-2">
              <GetRating recipe={recipe} />
            </div>
          </div>
        </div>

        {/* Recipe Details */}
        <div className="px-8 py-6 bg-funchisa-100">
          {/* Category */}
          <div className="mb-4">
            <span className="font-bold text-2xl text-customRed">Category:</span>
            <span className="ml-2 text-xl font-medium">{recipe.category}</span>
          </div>

          {/* Ingredients */}
          <div className="mb-4">
            <h4 className="text-2xl font-bold text-customRed">Ingredients:</h4>
            <ul className="list-disc pl-5 space-y-1">
              {recipe.ingredients.map((ing, index) => (
                <li key={index} className="text-xl font-medium text-gray-800">
                  {ing}
                </li>
              ))}
            </ul>
          </div>

          {/* Steps */}
          <div className="mb-4">
            <h4 className="text-2xl font-bold text-customRed mb-2">Steps:</h4>
            <ol className="list-decimal pl-5 space-y-1">
              {recipe.steps.map((step, index) => (
                <li key={index} className="text-lg font-normal text-gray-700">
                  {step}
                </li>
              ))}
            </ol>
          </div>

          {/* Author */}
          {!mine && (
            <div className="text-right text-gray-700 mt-6">
              <span className="font-bold text-lg text-customRed">Author:</span>
              <span className="ml-2 text-lg font-semibold">
                {recipe.authorName}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Add Rating and Comments Section */}
      {!mine && (
        <div className="mt-10">
          <AddRating recipe={recipe} id={id} />
          <div className="mt-6">
            <h4 className="text-2xl text-gray-700">Comments:</h4>
            <CommentService recipe={recipe} id={id} />
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeDisplay;
