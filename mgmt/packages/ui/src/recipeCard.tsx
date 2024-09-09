import React from 'react';


export interface Recipe {
    title: string;
    description: string;
    ingredients: string[];
    steps: string[];
    category: {
        type: string;
        enum: ['Dessert', 'Chinese', 'Italian', 'Beverages'];
        required: true;
    };
    feedback?: string[];
    ratings?: number;
    author: string;
}

interface RecipeDisplayProps {
  recipe: Recipe;
}

const RecipeDisplay: React.FC<RecipeDisplayProps> = ({ recipe }) => {
  return (
    <div>
      <div><h3>{recipe.title}</h3></div>
      <div><h3>{recipe.description}</h3></div>
      <div>Category: {recipe.category.type}</div>
      <div>
        <h4>Ingredients:</h4>
        {recipe.ingredients.map((ing, index) => (
          <div key={index}>{ing}</div>
        ))}
      </div>
      <div>
        <h4>Steps:</h4>
        {recipe.steps.map((step, index) => (
          <div key={index}>{step}</div>
        ))}
      </div>
      {recipe.feedback && (
        <div>
          <h4>Feedback:</h4>
          {recipe.feedback.map((fb, index) => (
            <div key={index}>{fb}</div>
          ))}
        </div>
      )}
      {recipe.ratings && <div>Ratings: {recipe.ratings}</div>}
      <div>Author: {recipe.author}</div>
    </div>
  );
};

export default RecipeDisplay;
