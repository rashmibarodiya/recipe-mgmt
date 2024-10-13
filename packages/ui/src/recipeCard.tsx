import React from 'react';

export interface Recipe {
  _id?: string,
  title: string;
  description: string;
  ingredients: string[];
  image: string;
  steps: string[];
  category: 'Dessert' | 'Chinese' | 'Italian' | 'Beverages' | 'Other';
  otherCategory?: string;
  feedback?: string[];
  ratings?: number[];
  author: string;
}

export interface RecipeDisplayProps {
  recipe: Recipe;
}
const RecipeDisplay: React.FC<RecipeDisplayProps> = ({ recipe }) => {
  return (
<div>
<div className='text-red-500'>hi</div>

</div>


    // <div className=''>
    //   <div className='mt-10'></div>
    //   <div className="max-w-md mx-auto rounded-lg overflow-auto md:max-w-2xl p-6 space-y-10 shadow-lg">
        
    //     {/* Image as a Circle */}
    //     <div className="flex justify-center">
    //       <img
    //         src={recipe.image}
    //         alt={recipe.title}
    //         className="w-32 h-32 rounded-full border-4 border-gray-300 object-cover"
    //       />
    //     </div>

    //     {/* Title and Description with Background */}
    //     <div className="bg-gray-100 p-4 rounded-lg">
    //       <h3 className="text-3xl font-bold text-center text-red-800">{recipe.title}</h3>
    //       <p className="text-lg text-center text-gray-600 mt-2">{recipe.description}</p>
    //     </div>

    //     {/* Category */}
    //     <div className="text-center">
    //       <span className="font-bold text-gray-700">Category:</span>
    //       <span className="ml-2 text-gray-600 text-red">{recipe.category}</span>
    //     </div>

    //     {/* Ingredients */}
    //     <div className="text-gray-800">
    //       <h4 className="text-xl font-medium">Ingredients:</h4>
    //       <ul className=" list-image-[url(checkmark.png)] pl-5 space-y-1">
    //         {recipe.ingredients.map((ing, index) => (
    //           <li key={index} className="text-gray-600">{ing}</li>
    //         ))}
    //       </ul>
    //     </div>

    //     {/* Steps */}
    //     <div className="text-gray-800">
    //       <h4 className="text-xl font-medium">Steps:</h4>
    //       <ol className="list-decimal pl-5 space-y-1">
    //         {recipe.steps.map((step, index) => (
    //           <li key={index} className="text-gray-600">{step}</li>
    //         ))}
    //       </ol>
    //     </div>

    //     {/* Author */}
    //     <div className="text-center text-gray-700">
    //       <span className="font-bold">Author:</span>
    //       <span className="ml-2">{recipe.author}</span>
    //     </div>
    //   </div>
    // </div>
  );
};

export default RecipeDisplay;
