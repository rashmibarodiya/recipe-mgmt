import axios from "axios";
import { useEffect, useState } from "react";
import {RecipeDisplay} from '@repo/ui/src/recipeCard';

export interface Recipe {
    title: string;
    description: string;
    ingredients: string[];
    steps: string[];
    category: {
        type: string;
        enum: ['Dessert', 'Chinese', 'Italian', 'Beverages'];
        required: true;
    };
    feedback?: string[];
    ratings?: number;
    author: string;
}

export default function getRecipe() {
    const [recipe, setRecipe] = useState<Recipe | null>(null);
    const [id, setId] = useState("");

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const res = await axios.get(`/api/getRecipe/${id}`);
                setRecipe(res.data);
            } catch (e) {
                console.error(e);
            }
        };

        fetchRecipe();
    }, [id]); // Fetch new recipe whenever `id` changes

    return (
        <div>
            {recipe ? <RecipeDisplay recipe={recipe} /> : <p>Loading recipe...</p>}
        </div>
    );
}
