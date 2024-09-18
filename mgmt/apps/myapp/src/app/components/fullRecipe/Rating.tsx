import React, { useState, useEffect } from "react";
import  { RecipeDisplayProps } from "@/types/recipe";
import axios from "axios";
import { useSession } from "next-auth/react";
import { FaStar } from "react-icons/fa";

// This component renders the rating stars and handles the rating submission.
const RatingService: React.FC<RecipeDisplayProps> = ({ recipe, id }) => {
  const [mine, setMine] = useState(false);
  const [rating, setRating] = useState<number>(0); 
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user?.name === recipe.authorName) {
      setMine(true);
    }
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
  }, [id, mine, session, recipe.authorName]);

  const handleRatingSubmit = async () => {
    try {
      if (rating !== null) {
        const res = await axios.post(
          `/api/feedback/addRating/${id}`,
          { points: rating },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        alert("Rating added: " + res.data.message);
        setRating(0); // Reset the rating after submission
      } else {
        alert("Please select a rating.");
      }
    } catch (e) {
      console.error("Failed to add rating", e);
      alert(e);
    }
  };
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



      {/* Add Rating Section */}
      <div className="text-center mt-8">
        <h3 className="text-2xl text-gray-700">Add a Rating:</h3>
        <div className="flex justify-center mt-4">
          {[1, 2, 3, 4, 5].map((value) => (
            <FaStar
              key={value}
              size={32}
              className={`mx-2 cursor-pointer ${    
                 (hoverRating ?? rating ?? 0) >= value ? "text-yellow-500" : "text-gray-300"
              }`}
              onClick={() => setRating(value)}
              onMouseEnter={() => setHoverRating(value)}
              onMouseLeave={() => setHoverRating(null)}
            />
          ))}
        </div>
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
          onClick={handleRatingSubmit}
        >
          Submit Rating
        </button>
      </div>
    </div>
  );
};

export default RatingService;
