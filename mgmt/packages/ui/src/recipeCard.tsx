import React from 'react';

export interface Recipe {
  title: string;
  description: string;
  ingredients: string[];
  img:string;
  steps: string[];
  category: {
    type: string;
    enum: ['Dessert', 'Chinese', 'Italian', 'Beverages', 'Other'];
    required: true;
  };
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
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-auto md:max-w-2xl p-6 space-y-4">
      <div>
        <h3 className="text-2xl font-semibold text-gray-800">{recipe.title}</h3>
        <p className="text-sm text-gray-500">{recipe.description}</p>
      </div>
      <div>
        <span className="font-bold text-gray-700">Category:</span> 
        <span className="ml-2 text-gray-600">{recipe.category.type}</span>
      </div>
      <div className="text-red-500">
        <h4 className="text-lg font-medium">Ingredients:</h4>
        <ul className="list-disc pl-5 space-y-1">
          {recipe.ingredients.map((ing, index) => (
            <li key={index} className="text-gray-600">{ing}</li>
          ))}
        </ul>
      </div>
      <div>
        <h4 className="text-lg font-medium text-gray-800">Steps:</h4>
        <ol className="list-decimal pl-5 space-y-1">
          {recipe.steps.map((step, index) => (
            <li key={index} className="text-gray-600">{step}</li>
          ))}
        </ol>
      </div>
      {recipe.feedback && (
        <div>
          <h4 className="text-lg font-medium text-gray-800">Feedback:</h4>
          <ul className="list-disc pl-5 space-y-1">
            {recipe.feedback.map((fb, index) => (
              <li key={index} className="text-gray-600">{fb}</li>
            ))}
          </ul>
        </div>
      )}
      {recipe.ratings !== undefined && (
        <div className="font-semibold text-gray-700">Ratings: {recipe.ratings}</div>
      )}
      <div className="text-gray-700">
        <span className="font-bold">Author:</span> 
        <span className="ml-2">{recipe.author}</span>
      </div>
    </div>
  );
};

export default RecipeDisplay;
