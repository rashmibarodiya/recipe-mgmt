
  import Recipe from "@/types/recipe";
  import React, { useState, useEffect } from "react";
  import axios from "axios";

  interface GetRatingProps{
    recipe :Recipe
  }
  const GetRating: React.FC<GetRatingProps> = ({ recipe }) => {
    const [rating, setRating] = useState<number>(0); 


    useEffect(() => {
    
        const fetchRating = async () => {
            if (recipe._id) {
              try {
                const res = await axios.get(`/api/getData/getRating/${recipe._id}`);
                setRating(res.data.avgRating);
              } catch (err) {
                console.error(err);
                alert(err);
              }
            }
        };
        fetchRating();
      }, [rating,recipe._id]);

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
  
    return (
      <div>
        {rating !== undefined && (
          <div className="font-semibold text-gray-700 mt-2 flex items-center">
            <span className="mr-2">Ratings:</span>
            <span className="text-yellow-500">{getStarRating(rating)}</span>
            <span className="ml-2 text-gray-600">({rating.toFixed(1)})</span>
          </div>
        )}
      </div>
    );
  };
  
  export default GetRating;
  