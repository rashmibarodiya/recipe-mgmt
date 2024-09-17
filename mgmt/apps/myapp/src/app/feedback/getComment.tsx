import FeedbackType from "../../types/feedback";

interface GetReviewProps {
  feedbacks?: FeedbackType[];
}

export default function GetReview({ feedbacks }: GetReviewProps) {
  return (
    <div>
    <div className="text-black w-2/3">
      {feedbacks?.length ? (
        feedbacks.map((feedback, index) => (
          <div
            key={feedback._id}
            className={`flex ${
              index % 2 === 0 ? "flex-row " : "flex-row-reverse "
            } justify-between items-center  w-full mb-6`}
          >
            <div className="w-96 bg-gray-100 p-4 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-customRed mb-2">
                {feedback.review}
              </h3>
              <p className="text-gray-600">
                <span className="font-bold">By:</span> {feedback.username}
              </p>
              <p className="text-gray-500 text-sm">
                <span className="font-bold">Created At:</span>{" "}
                {new Date(feedback.createdAt!).toLocaleString()}
              </p>
            </div>
          </div>
        ))
      ) : (
        <p>No reviews yet.</p>
      )}
    </div>
    </div>
  );
}
