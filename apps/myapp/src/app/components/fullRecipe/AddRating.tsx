import React, { useState, useEffect } from "react";
import { RecipeDisplayProps } from "@/types/recipe";
import axios from "axios";
import { useSession } from "next-auth/react";
import { FaStar } from "react-icons/fa";

const AddRating: React.FC<RecipeDisplayProps> = ({ recipe, id }) => {
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
  }, [id, mine, session, recipe.authorName,recipe._id]);

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
        if (!res.data.message){
          alert("you are not logged in")
        }else{
        alert( res.data.message);
        setRating(0); 
        }
      } else {
        alert("Please select a rating.");
      }
    } catch (e) {
      console.error("Failed to add rating", e);
      alert(e);
    }
  };

  return (
    <div className="text-center mt-8">
      <h3 className="text-2xl text-gray-700 mb-4">Add Rating:</h3>
      <div className="flex justify-center items-center space-x-4">
        <div className="flex">
          {[1, 2, 3, 4, 5].map((value) => (
            <FaStar
              key={value}
              size={32}
              className={`mx-1 cursor-pointer ${
                (hoverRating ?? rating ?? 0) >= value ? "text-yellow-500" : "text-gray-300"
              }`}
              onClick={() => setRating(value)}
              onMouseEnter={() => setHoverRating(value)}
              onMouseLeave={() => setHoverRating(null)}
            />
          ))}
        </div>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
          onClick={handleRatingSubmit}
        >
          Submit Rating
        </button>
      </div>
    </div>
  );
};

export default AddRating;
