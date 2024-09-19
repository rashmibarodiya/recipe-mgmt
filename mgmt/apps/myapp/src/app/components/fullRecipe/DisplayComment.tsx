import React, { useState, useEffect } from "react";
import Recipe, { RecipeDisplayProps } from "@/types/recipe";
import axios from "axios";
import GetReview from "../../feedback/getComment";
import FeedbackType from "@/types/feedback";
import { useSession } from "next-auth/react";

const CommentService: React.FC<RecipeDisplayProps> = ({ recipe, id }) => {
  const [feedbacks, setFeedbacks] = useState<FeedbackType[]>([]);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();
  const [mine, setMine] = useState(false);
  const [review, setReview] = useState("");

  useEffect(() => {
    if (session?.user?.name === recipe.authorName) {
      setMine(true);
    }

    const fetchFeedback = async () => {
      if (id) {
        try {
          const res = await axios.get(`/api/getData/getComment/${id}`);
          setFeedbacks(res.data.reviews);
          setLoading(false);
        } catch (err) {
          console.error(err);
          alert(err);
          setLoading(false);
        }
      }
    };
    fetchFeedback();
  }, [id, mine, session, recipe.authorName]);

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
      alert("holy " + res.data.message);
      setReview("");
      // Re-fetch feedbacks after submitting a new review
      const feedbackRes = await axios.get(`/api/feedback/getComment/${id}`);
      setFeedbacks(feedbackRes.data.feedbacks);
    } catch (e) {
      console.error("Request failed", e);
      alert("this is the problem");
    }
  };

  return (
    <div>
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
  );
};

export default CommentService;