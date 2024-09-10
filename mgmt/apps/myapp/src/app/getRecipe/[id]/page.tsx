'use client';
import { useParams } from 'next/navigation'; // Use this for dynamic params in App Router
import { useEffect, useState } from 'react';
import RecipeDisplay, { Recipe } from '@repo/ui/src/recipeCard';
import axios from 'axios';

const RecipeDetailPage = () => {
    const { id } = useParams(); // Get the dynamic ID from the URL
    const [recipe, setRecipe] = useState<Recipe | null>(null);

    useEffect(() => {
        const fetchRecipe = async () => {
            if (id) {
                try {
                    const res = await axios.get(`/api/getRecipe/${id}`); // Fetch recipe by ID
                    setRecipe(res.data.recipe);
                } catch (error) {
                    console.error(error);
                }
            }
        };

        fetchRecipe();
    }, [id]);

    if (!recipe) return <div>Loading...</div>;

    return (
        <div >
            <RecipeDisplay recipe={recipe}></RecipeDisplay>
        </div>
    );
};

export default RecipeDetailPage;
