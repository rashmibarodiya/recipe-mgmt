

'use client';
import { useState, useEffect } from "react";
import axios from "axios";
import  Recipe  from "../../../types/recipe";
import HalfRecipe from "../../components/halfRecipe";
import { useParams, useRouter } from 'next/navigation';

export default function GetUserRecipe() {
    const { category } = useParams();
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const router = useRouter();
   // const img = "https://img.freepik.com/free-vector/hand-drawn-no-data-concept_52683-127823.jpg?size=626&ext=jpg&ga=GA1.1.2008272138.1726099200&semt=ais_hybrid"

    const handleClick = (id: string) => {
        router.push(`/getData/getRecipe/${id}`);
    }

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const res = await axios.get(`/api/getByCategory/${category}`);
                console.log("this is react", res.data);
                setRecipes(res.data.recipes);
            } catch (e) {
                console.error(e);
            }
        };

        fetchRecipes();
    }, [category]);

    return (
        <div className="font-bold text-black pt-12 px-4">
            <h1 className="text-4xl font-bold text-center mb-6">{category} Recipes</h1>
            <div className="md:ml-10 md:mr-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {recipes.map((recipe, index) => (
                    <div
                        key={index}
                        className="p-4 cursor-pointer"

                    >
                        {/* red-100
                        violet-100
                        orange-200
                         */}
                        <HalfRecipe recipe={recipe} className="h-full bg-yellow-100 " mine  = {false} id={recipe._id ||""} />
                    </div>
                ))}
            </div>
        </div>
    );
}
