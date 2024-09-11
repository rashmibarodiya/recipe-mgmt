'use client';
import { useParams } from 'next/navigation'; // Use this for dynamic params in App Router
import { useEffect, useState } from 'react';
import RecipeDisplay from '../../components/recipeCard';
import Recipe from '@/types/recipe';
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
                    console.log(JSON.stringify(res.data.recipe))
                  //  alert(JSON.stringify(res.data.recipe))
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
            {/* <div className='text-black'>  f djfdjgfdhf {recipe.category.type}ghdkjfhdkjf</div> */}
          
            <RecipeDisplay recipe={recipe}></RecipeDisplay>
        </div>
    );
};

export default RecipeDetailPage;
