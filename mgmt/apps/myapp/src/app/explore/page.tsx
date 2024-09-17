"use client";
import HalfRecipe from "../components/halfRecipe"; // Adjust path as needed
import CategoryDisplay from "../components/Display";

export default function ExplorePage() {
    // const featuredRecipes = [
    //     // Array of featured recipe objects
    // ];

    // const categories = [
    //     // Array of category objects
    // ];
    const img =
    "https://media.istockphoto.com/id/1190330112/photo/fried-pork-and-vegetables-on-white-background.jpg?s=612x612&w=0&k=20&c=TzvLLGGvPAmxhKJ6fz91UGek-zLNNCh4iq7MVWLnFwo=";
  const italian =
    "https://st2.depositphotos.com/1326558/7226/i/450/depositphotos_72263189-stock-photo-penne-pasta-in-tomato-sauce.jpg";
  const img3 = "https://slurrp.club/wp-content/uploads/2021/10/DSC_0037-2.jpg";
  const dessert =
    "https://img.freepik.com/free-photo/homemade-roasted-plum-ice-cream-recipe-food-photography_53876-96019.jpg?w=996&t=st=1726297575~exp=1726298175~hmac=9396b7e1326da8104c656c2e60d95d0cba4c52853b58ab24b5eefd733c544607";
  const chinese =
    "https://img.freepik.com/free-photo/pork-meatballs-dark-surface_1150-43612.jpg?w=996&t=st=1726297756~exp=1726298356~hmac=f85a4a1d3fc462e286dd92ee8594184e47f15a333d49248f715916afdb91e0e8";
 
    return (
        <div className="p-6 md:p-10 lg:p-14">
            {/* Hero Section */}
            <div className="flex justify-center w-2/3 h-full p-10 bg-orange-100 shadow-lg text-slate-900 rounded-lg">
            <div className="flex-1">
              <h1 className="text-6xl font-bold mt-10 mb-6 text-customGold">
                    Explore Delicious Recipes
                </h1>
                <p className="text-lg text-gray-600 mb-6">
                    Discover a world of flavors and find your next favorite recipe. Use the search bar below or browse by category.
                </p>
                <input
                    type="text"
                    placeholder="Search for recipes, ingredients, or categories"
                    className="w-full md:w-1/2 p-2 border border-gray-300 rounded-lg"
                />
            </div>
            </div>

            {/* Featured Recipes */}
            <div className="mb-10">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                    Featured Recipes
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {/* {featuredRecipes.map((recipe, index) => (
                        <RecipeCard key={index} recipe={recipe} />
                    ))} */}
                </div>
            </div>

            {/* Recipe Categories */}
            <div className="mb-10">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                    Recipe Categories
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                <CategoryDisplay url={italian} category="Italian" />
        <CategoryDisplay url={img} category="Vegan" />
        <CategoryDisplay url={italian} category="Vegan" />
        <CategoryDisplay url={chinese} category="Chinese" />
        <CategoryDisplay url={dessert} category="Dessert" />
        <CategoryDisplay url={img3} category="Vegan" />
                </div>
            </div>

            {/* Trending or Recommended Recipes */}
            <div className="mb-10">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                    Trending Recipes
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {/* Add your trending recipes here */}
                </div>
            </div>

            {/* Seasonal or Special Recipes */}
            <div className="mb-10">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                    Seasonal Recipes
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {/* Add seasonal recipes here */}
                </div>
            </div>

            {/* Call to Action */}
            <div className="text-center">
                <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">
                    Join Our Community
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                    Share your own recipes, follow us on social media, and stay updated with the latest culinary trends.
                </p>
                <button className="bg-customGold text-gray-800 hover:bg-yellow-500 hover:text-gray-900 font-semibold py-2 px-4 rounded transition-colors duration-300">
                    Get Started
                </button>
            </div>
        </div>
    );
}
