import React, { useState, useEffect } from "react";
import Recipe, { RecipeDisplayProps } from "@/types/recipe";

import CommentService from "./fullRecipe/DisplayComment";
import RatingService from "./fullRecipe/Rating"
import { useSession } from 'next-auth/react';


const RecipeDisplay: React.FC<RecipeDisplayProps> = ({ recipe, id }) => {
 
  const { data: session } = useSession();
  const [mine, setMine] = useState(false);

  useEffect(() => {
    if (session?.user?.name === recipe.authorName) {
      setMine(true);
    }   
  }, [id, mine, session, recipe.authorName]);

  return (
    <div className="py-10 text-black">
      <div className="max-w-md mx-auto bg-gray-100 rounded-lg border-8 border-customRed overflow-auto md:max-w-2xl space-y-10 shadow-lg">
        <div className="flex bg-customRed p-6 items-center">
          <div className="flex-shrink-0">
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-32 h-32 rounded-full border-4 border-gray-300 object-cover"
            />
          </div>

          <div className="ml-6 w-full">
            <h3 className="text-4xl font-bold text-customRed-800">
              {recipe.title}
            </h3>
            <p className="text-lg text-customRed-600 mt-2">
              {recipe.description}
            </p>
          </div>
        </div>

        <div className="text-center">
          <span className="font-bold text-xl text-customRed">Category:</span>
          <span className="ml-2 text-gray-600">{recipe.category}</span>
        </div>

        <div className="px-4 text-gray-800">
          <h4 className="text-xl font-bold text-customRed">Ingredients:</h4>
          <ul className="list-disc pl-5 space-y-1">
            {recipe.ingredients.map((ing, index) => (
              <li key={index} className="text-gray-900">
                {ing}
              </li>
            ))}
          </ul>
        </div>

        <div className="px-4 text-gray-800">
          <h4 className="text-xl font-bold text-customRed">Steps:</h4>
          <ol className="list-decimal pl-5 space-y-1">
            {recipe.steps.map((step, index) => (
              <li key={index} className="text-gray-900">
                {step}
              </li>
            ))}
          </ol>
        </div>

        {!mine && (
          <div className="text-center text-gray-700">
            <span className="font-bold text-customRed">Author:</span>
            <span className="ml-2">{recipe.authorName}</span>
          </div>
        )}
      </div>

      {!mine && (
        <div>
          {/* Add Rating Section */}
          <RatingService recipe={recipe} id = {id}></RatingService>

          {/* Comments Section */}
          <div className="mt-10 ml-80 text-2xl text-gray-700">Comments:</div>
          <CommentService recipe = {recipe} id = {id}></CommentService>
        </div>
      )}
    </div>
  );
};

export default RecipeDisplay;
