import React from 'react';
import { Recipe, RecipeDisplayProps } from './recipeCard';  // Adjust the import as necessary

const RecipeCard: React.FC<RecipeDisplayProps> = ({ recipe }) => {
  // Calculate the average rating
console.log(recipe)
  const avgRating = (ratings?: number[]): number => {
    if (!ratings || ratings.length === 0) return 0;
    const totalRating = ratings.reduce((acc, rating) => acc + rating, 0);
    return totalRating / ratings.length;
  };

  // Generate star rating representation
  const getStarRating = (rating: number) => {
    const fullStar = '★';
    const emptyStar = '☆';
    const starCount = 5;
    const roundedRating = Math.round(rating);

    let stars = '';
    for (let i = 1; i <= starCount; i++) {
      stars += i <= roundedRating ? fullStar : emptyStar;
    }

    return stars;
  };

  
  const averageRating = avgRating(recipe.ratings);

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-auto md:max-w-2xl p-6 space-y-4">
      <div>
        <img src={recipe.image} alt={recipe.title} className="w-full h-48 object-cover rounded-t-lg" />
      </div>
      <div>
        <h3 className="text-2xl font-semibold text-gray-800">{recipe.title}</h3>
        <p className="text-sm text-gray-500">{recipe.description}</p>
      </div>
      {/* <div>
        <span className="font-bold text-gray-700">Category:</span> 
        <span className="ml-2 text-gray-600">{recipe.category.type}</span>
      </div> */}
      {/* <div className="text-red-500">
        <h4 className="text-lg font-medium">Ingredients:</h4>
        <ul className="list-disc pl-5 space-y-1">
          {recipe.ingredients.map((ing, index) => (
            <li key={index} className="text-gray-600">{ing}</li>
          ))}
        </ul>
      </div> */}
      {/* <div>
        <h4 className="text-lg font-medium text-gray-800">Steps:</h4>
        <ol className="list-decimal pl-5 space-y-1">
          {recipe.steps.map((step, index) => (
            <li key={index} className="text-gray-600">{step}</li>
          ))}
        </ol>
      </div> */}
      {/* {recipe.feedback && (
        <div>
          <h4 className="text-lg font-medium text-gray-800">Feedback:</h4>
          <ul className="list-disc pl-5 space-y-1">
            {recipe.feedback.map((fb, index) => (
              <li key={index} className="text-gray-600">{fb}</li>
            ))}
          </ul>
        </div>
      )} */}
      {recipe.ratings && (
        <div className="font-semibold text-gray-700 flex items-center">
          <span className="mr-2">Ratings:</span>
          <span className="text-yellow-500">{getStarRating(averageRating)}</span>
          <span className="ml-2 text-gray-600">({averageRating.toFixed(1)})</span>
        </div>
      )}
      <div className="text-gray-700">
        <span className="font-bold">Author:</span> 
        <span className="ml-2">{recipe.author}</span>
      </div>
    </div>
  );
};

export default RecipeCard;
