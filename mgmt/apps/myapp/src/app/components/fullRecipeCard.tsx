import React, { useState } from 'react';
import Recipe, { RecipeDisplayProps } from '@/types/recipe';
import axios from 'axios';

const RecipeDisplay: React.FC<RecipeDisplayProps> = ({ recipe, mine }) => {
    const id = recipe._id;
    const [review, setReview] = useState("");

    const handleSubmit = async () => {
        try {
            const res = await axios.post(`/api/feedback/addComment/${id}`, {
                review: review
            }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            console.log(res.data.message);
            alert(res.data.message)
        } catch (e) {
            console.error("Request failed", e);
            alert(e);
        }
    };

    return (
        <div className="py-10">
            <div className="max-w-md mx-auto bg-gray-100 rounded-lg border-8 border-customRed overflow-auto md:max-w-2xl space-y-10 shadow-lg">
                <div className="flex bg-customRed p-6 items-center">
                    {/* Image as a Circle */}
                    <div className="flex-shrink-0">
                        <img
                            src={recipe.image}
                            alt={recipe.title}
                            className="w-32 h-32 rounded-full border-4 border-gray-300 object-cover"
                        />
                    </div>

                    {/* Title and Description with Background */}
                    <div className="ml-6 w-full">
                        <h3 className="text-4xl font-bold text-customRed-800">{recipe.title}</h3>
                        <p className="text-lg text-customRed-600 mt-2">{recipe.description}</p>
                    </div>
                </div>

                {/* Category */}
                <div className="text-center">
                    <span className="font-bold text-xl text-customRed">Category:</span>
                    <span className="ml-2 text-gray-600">{recipe.category}</span>
                </div>

                {/* Ingredients */}
                <div className="px-4 text-gray-800">
                    <h4 className="text-xl font-bold text-customRed">Ingredients:</h4>
                    <ul className="list-disc pl-5 space-y-1">
                        {recipe.ingredients.map((ing, index) => (
                            <li key={index} className="text-gray-900">{ing}</li>
                        ))}
                    </ul>
                </div>

                {/* Steps */}
                <div className="px-4 text-gray-800">
                    <h4 className="text-xl font-bold text-customRed">Steps:</h4>
                    <ol className="list-decimal pl-5 space-y-1">
                        {recipe.steps.map((step, index) => (
                            <li key={index} className="text-gray-900">{step}</li>
                        ))}
                    </ol>
                </div>

                {/* Conditionally render Author */}
                {!mine && (
                    <div className="text-center text-gray-700">
                        <span className="font-bold text-customRed">Author:</span>
                        <span className="ml-2">{recipe.authorName}</span>
                    </div>
                )}
            </div>

            {!mine && (
                <div>
                    <div className="mt-10 ml-80 text-2xl text-gray-700">
                        Comments:
                    </div>
                    <div className="flex justify-center mt-4">
                        <input
                            type="text"
                            placeholder="Add a comment here"
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
                </div>
            )}
        </div>
    );
};

export default RecipeDisplay;
