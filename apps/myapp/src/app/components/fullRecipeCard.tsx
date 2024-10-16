import React, { useState, useEffect } from "react";
import { RecipeDisplayProps } from "@/types/recipe";
import CommentService from "./fullRecipe/DisplayComment";
import AddRating from "./fullRecipe/AddRating";
import GetRating from "./fullRecipe/GetRating";
import { useSession } from "next-auth/react";
// import Image from "next/image";


const RecipeDisplay: React.FC<RecipeDisplayProps> = ({ recipe, id }) => {
  const { data: session } = useSession();
  const [mine, setMine] = useState(false);
  // const[loading,setLoading] = useState(false);

  useEffect(() => {
    // setLoading(true)
    if (session?.user?.name === recipe.authorName) {
      setMine(true);
      // setLoading(false)
    }
  }, [session, recipe.authorName]);

  return (
    <div className="py-10 text-black ">
      {/* Main Card Container + rating +comment */}
      <div className=" md:max-w-3xl overflow-hiddenmx-auto rounded-lg border-4 border-gray-300 shadow-xl ">
        {/* Recipe Image and Info */}
        <div className="flex flex-col md:flex-row items-center bg-gradient-to-r from-red-500 via-red-400 to-red-500 p-6">
          <div className="flex-shrink-0">
            <img
              src={recipe.image}
              alt={recipe.title}
      //         width={500} 
      //         height={300} 
      // layout="responsive"
              className="w-32 h-32 md:w-48 md:h-48 rounded-full border-4 border-white object-cover shadow-md"
            />
          </div>
          <div className="mt-4 md:mt-0 md:ml-6 text-center md:text-left md:w-full">
            <h3 className="text-3xl md:text-4xl font-bold text-white">
              {recipe.title}
            </h3>
            <p className="text-lg text-white mt-2">{recipe.description}</p>
            <div className="mt-2">
              <GetRating recipe={recipe} />
            </div>
          </div>
        </div>

        {/* Recipe Details */}
        <div className="px-8 py-6 bg-white space-y-6">
          {/* Category */}
          <div className="w-full bg-gray-100 p-4 rounded-lg shadow-md">
            <h4 className="text-xl font-semibold text-gray-700">Category:</h4>
            <span className="ml-2 text-lg">{recipe.category}</span>
          </div>

          {/* Ingredients */}
          <div className="w-full bg-gray-100 p-4 rounded-lg shadow-md">
            <h4 className="text-xl font-semibold text-gray-700">Ingredients:</h4>
            <ul className="list-disc pl-5 mt-2">
              {recipe.ingredients.map((ing, index) => (
                <li key={index} className="text-lg text-gray-600">
                  {ing}
                </li>
              ))}
            </ul>
          </div>

          {/* Steps */}
          <div className="w-full bg-gray-100 p-4 rounded-lg shadow-md">
            <h4 className="text-xl font-semibold text-gray-700">Steps:</h4>
            <ol className="list-decimal pl-5 mt-2">
              {recipe.steps.map((step, index) => (
                <li key={index} className="text-lg text-gray-600">
                  {step}
                </li>
              ))}
            </ol>
          </div>

          {/* Author */}
          {!mine  &&(
            <div className="w-full bg-gray-100 p-4 rounded-lg shadow-md">
              <span className="font-semibold text-lg text-gray-700">Author:</span>
              <span className="ml-2 text-lg">{recipe.authorName}</span>
            </div>
          )}
        </div>
      </div>

      {/* Add Rating and Comments Section */}
      {!mine  &&(
        <div className="mt-10 p-6 bg-gray-50 rounded-lg shadow-lg">
          <AddRating recipe={recipe} id={id} />
          <div className="mt-6">
            <h4 className="text-2xl ml-5 font-semibold text-gray-700">Comments:</h4>
            <CommentService recipe={recipe} id={id} />
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeDisplay;
