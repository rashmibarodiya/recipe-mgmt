'use client'


import axios from "axios";
import { useEffect, useState } from "react";
import RecipeDisplay ,{Recipe} from '@repo/ui/src/recipeCard';

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
    }, [id]); 

    return (
        <div>
            {recipe ? <RecipeDisplay recipe={recipe} /> : <p>Loading recipe...</p>}
        </div>
    );
}
