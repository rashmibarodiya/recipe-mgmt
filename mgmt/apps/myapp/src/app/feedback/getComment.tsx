import FeedbackType from "../../types/feedback";

interface GetReviewProps {
  feedbacks?: FeedbackType[];
}

export default function GetReview({ feedbacks }: GetReviewProps) {
  return (
    <div className="text-black">
    <div className="max-w-4xl mx-auto p-6">
      {feedbacks?.length ? (
        feedbacks.map((feedback, index) => (
          <div
            key={feedback._id}
            className={`flex ${
              index % 2 === 0 ? "flex-row " : "flex-row-reverse "
            } justify-between items-start w-full mb-8`}
          >
            <div className=" flex-1 bg-gray-100 p-6 rounded-lg shadow-lg border border-gray-200">
              <h3 className="text-lg font-semibold text-red-600 mb-3">
                {feedback.review}
              </h3>
              <p className="text-gray-800 mb-1">
                <span className="font-bold">By:</span> {feedback.username}
              </p>
              <p className="text-gray-500 text-sm">
                <span className="font-bold text-gray-700">Created At:</span>{" "}
                {new Date(feedback.createdAt!).toLocaleString()}
              </p>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-400">No reviews yet.</p>
      )}
    </div>
    </div>
  );
}
