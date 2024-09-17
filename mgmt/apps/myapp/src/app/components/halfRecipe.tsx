import React, { useEffect, useState } from 'react';
import Recipe, { RecipeDisplayProps } from '../../types/recipe';  // Adjust the import as necessary
import { Button } from "@repo/ui/src/button";
import { useRouter } from "next/navigation";
import axios from 'axios';

const HalfRecipe: React.FC<RecipeDisplayProps> = ({ recipe, mine }) => {
  const [averageRating, setAverageRating] = useState<number>(0);
  const router = useRouter();

  // Fetch average rating
  useEffect(() => {
    const fetchRating = async () => {
      if (recipe._id) {
        try {
          const res = await axios.get(`/api/getData/getRating/${recipe._id}`);
          setAverageRating(res.data.avgRating);
          alert(res.data.avgRating)
          console.log("this is average rating", res.data.avgRating)
        } catch (error) {
          alert(error)
          console.error("Failed to fetch average rating", error);
        }
      }
    };

    fetchRating();
  }, [recipe._id]);

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

  const handleClick = (id: string) => {
    router.push(`/admin/getRecipe/${id}`);
  };

  return (
    <div className="max-w-md mx-auto bg-orange-200 rounded-lg shadow-lg overflow-auto md:max-w-2xl p-6 space-y-4 ">
      <div onClick={() => handleClick(recipe._id || '0')}>
        <div>
          <img src={recipe.image} alt={recipe.title} className="w-full h-48 mb-4 object-cover rounded-t-lg" />
        </div>
        <div>
          <h3 className="text-2xl font-semibold text-gray-800">{recipe.title}</h3>
          <p className="text-sm text-orange-700 mt-1">{recipe.description}</p>
        </div>
        {averageRating !== undefined && (
          <div className="font-semibold text-gray-700 mt-2 flex items-center">
            <span className="mr-2">Ratings:</span>
            <span className="text-yellow-500">{getStarRating(averageRating)}</span>
            <span className="ml-2 text-gray-600">({averageRating.toFixed(1)})</span>
          </div>
        )}
      </div>

      <div className="text-gray-700">
        {/* Conditionally render the author or the Edit button */}
        {!mine ? (
          <>
            <span className="font-bold">Author:</span>
            <span className="ml-2">{recipe.authorName}</span>
          </>
        ) : (
          <Button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600" onClick={() => router.push(`/admin/editRecipe/${recipe._id}`)}>
            Edit Recipe
          </Button>
        )}
      </div>
    </div>
  );
};

export default HalfRecipe;
