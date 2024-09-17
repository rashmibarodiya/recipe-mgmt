import React, { useState, useEffect } from "react";
import Recipe, { RecipeDisplayProps } from "@/types/recipe";
import axios from "axios";
import GetReview from "../feedback/getComment";
import FeedbackType from "@/types/feedback";
//import {useSession} from 'next-auth/react'

const RecipeDisplay: React.FC<RecipeDisplayProps> = ({ recipe, mine, id}) => {
    
//   const id = recipe._id;
  const [review, setReview] = useState("");
  const [feedbacks, setFeedbacks] = useState<FeedbackType[]>([]); // Default to an empty array
  const [loading, setLoading] = useState(true);
 // const {data:session} = useSession()


  useEffect(() => {
    // if(session?.user?.name == recipe.authorName){
    //     setMine(true)
    //     console.log("mine " ,mine)
    // }

    const fetchFeedback = async () => {
     console.log("idddd ",id)
     console.log("mine " ,mine)
      if (id) {
        try {
           
          const res = await axios.get(`/api/getData/getComment/${id}`);
          setFeedbacks(res.data.reviews);
          console.log("getting feedback ",JSON.stringify(res.data.reviews))
          setLoading(false);
        } catch (err) {
          console.error(err);
          alert(err);
          setLoading(false);
        }
      }
    };
    fetchFeedback();
  }, [id,mine]);

  const handleSubmit = async () => {
    try {
      const res = await axios.post(
        `/api/feedback/addComment/${id}`,
        {
          review: review,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      alert("addComment"+res.data.message);
      setReview("");
      // Re-fetch feedbacks after submitting a new review
      const feedbackRes = await axios.get(`/api/feedback/getComment/${id}`);
      setFeedbacks(feedbackRes.data.feedbacks);
    } catch (e) {
      console.error("Request failed", e);
      alert(e);
    }
  };

  return (
    <div className="py-10 text-black">
      <div className="max-w-md mx-auto bg-gray-100 rounded-lg border-8 border-customRed overflow-auto md:max-w-2xl space-y-10 shadow-lg">
        <div className="flex bg-customRed p-6 items-center">
          <div className="flex-shrink-0">
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-32 h-32 rounded-full border-4 border-gray-300 object-cover"
            />
          </div>

          <div className="ml-6 w-full">
            <h3 className="text-4xl font-bold text-customRed-800">
              {recipe.title}
            </h3>
            <p className="text-lg text-customRed-600 mt-2">
              {recipe.description}
            </p>
          </div>
        </div>

        <div className="text-center">
          <span className="font-bold text-xl text-customRed">Category:</span>
          <span className="ml-2 text-gray-600">{recipe.category}</span>
        </div>

        <div className="px-4 text-gray-800">
          <h4 className="text-xl font-bold text-customRed">Ingredients:</h4>
          <ul className="list-disc pl-5 space-y-1">
            {recipe.ingredients.map((ing, index) => (
              <li key={index} className="text-gray-900">
                {ing}
              </li>
            ))}
          </ul>
        </div>

        <div className="px-4 text-gray-800">
          <h4 className="text-xl font-bold text-customRed">Steps:</h4>
          <ol className="list-decimal pl-5 space-y-1">
            {recipe.steps.map((step, index) => (
              <li key={index} className="text-gray-900">
                {step}
              </li>
            ))}
          </ol>
        </div>

        {!mine && (
          <div className="text-center text-gray-700">
            <span className="font-bold text-customRed">Author:</span>
            <span className="ml-2">{recipe.authorName}</span>
          </div>
        )}
      </div>


      {!mine && (
        <div>
          <div className="mt-10 ml-80 text-2xl text-gray-700">Comments:</div>
          <div className="flex justify-center mt-4">
            <input
              type="text"
              placeholder="Add a comment here"
              value={review}
              onChange={(e) => setReview(e.target.value)}
              className="w-full max-w-md px-4 py-2 text-black border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>

          <div className="text-black mt-4">
            {loading ? (
              <p>Loading comments...</p>
            ) : (
              <GetReview feedbacks={feedbacks}></GetReview>
            )}
          </div>
        </div>
      )}


     
    </div>
  );
};

export default RecipeDisplay;
