'use client';
import { useParams } from 'next/navigation'; // Use this for dynamic params in App Router
import { useEffect, useState } from 'react';
import {useSession} from 'next-auth/react'
import RecipeDisplay from '../../../components/fullRecipeCard';
import Recipe from '@/types/recipe';
import axios from 'axios';



const RecipeDetailPage = () => {
    const {data:session} = useSession()
    const { id } = useParams(); 
    const [recipe, setRecipe] = useState<Recipe | null>(null);
    const [mine, setMine] =useState(false)

    useEffect(() => {
        const fetchRecipe = async () => {
            if (id) {
                try {
                    const res = await axios.get(`/api/admin/getRecipe/${id}`); // Fetch recipe by ID
                    setRecipe(res.data.recipe);
                    if(session?.user?.name == res.data.authorName){
                        setMine(true)
                    }
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
          
            <RecipeDisplay recipe={recipe} mine = {mine}></RecipeDisplay>
        </div>
    );
};

export default RecipeDetailPage;
