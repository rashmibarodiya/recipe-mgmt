import React, { useState, useEffect } from "react";
import Recipe, { RecipeDisplayProps } from "@/types/recipe";
import axios from "axios";
import GetReview from "../../feedback/getComment";
import FeedbackType from "@/types/feedback";
import { useSession } from "next-auth/react";
import { FaStar } from "react-icons/fa";

// This component renders the rating stars and handles the rating submission.
const RatingService: React.FC<RecipeDisplayProps> = ({ recipe, id }) => {
  const [mine, setMine] = useState(false);
  const [rating, setRating] = useState<number | null>(null); // State for the rating
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user?.name === recipe.authorName) {
      setMine(true);
    }
    // const fetchRating = async () => {
    //     if (recipe._id) {
    //       try {
    //         const res = await axios.get(`/api/getData/getRating/${recipe._id}`);
    //         setRating(res.data.avgRating);
    //       } catch (err) {
    //         console.error(err);
    //         alert(err);
    //       }
    //     }
    // };
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
        setRating(null); // Reset the rating after submission
      } else {
        alert("Please select a rating.");
      }
    } catch (e) {
      console.error("Failed to add rating", e);
      alert(e);
    }
  };

  return (
    <div>
      {/* Add Rating Section */}
      <div className="text-center mt-8">
        <h3 className="text-2xl text-gray-700">Add a Rating:</h3>
        <div className="flex justify-center mt-4">
          {[1, 2, 3, 4, 5].map((value) => (
            <FaStar
              key={value}
              size={32}
              className={`mx-2 cursor-pointer ${
                (hoverRating || rating) >= value
                  ? "text-yellow-500"
                  : "text-gray-300"
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
