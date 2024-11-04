"use client";
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import RecipeForm from '../../../components/RecipeCreateForm'; 
import axios from 'axios';
import { RecipeFormProps } from '@/types/recipeForm';

const EditRecipe = () => {
    const { id } = useParams();
    const [initialValues, setInitialValues] = useState<RecipeFormProps['initialValues']>({
        title: '',
        description: '',
        image: '',
        category: '',
        otherCategory: '',
        steps: [{ step: '' }],
        ingredients: [{ ing: '' }],
    });
    const [loading, setLoading] = useState(true); // Add loading state

    useEffect(() => {
        const fetchRecipe = async () => {
            if (id) {
                try {
                    const res = await axios.get(`/api/admin/getRecipe/${id}`);
                    const recipe = res.data.recipe;
                    setInitialValues({
                        title: recipe.title,
                        description: recipe.description,
                        image: recipe.image,
                        category: recipe.category,
                        otherCategory: recipe.otherCategory || '',
                        steps: recipe.steps.map((step: string) => ({ step })),
                        ingredients: recipe.ingredients.map((ing: string) => ({ ing })),
                    });
                } catch (error) {
                    console.error('Error fetching recipe:', error);
                } finally {
                    setLoading(false); // Set loading to false once data is fetched
                }
            }
        };
        fetchRecipe();
    }, [id]);

    const handleSubmit = async (recipeData: any) => {
        try {
            const response = await axios.put(`/api/admin/editRecipe/${id}`, recipeData, {
                headers: { 'Content-Type': 'application/json' },
            });
            console.log('Response:', response.data);
            alert('Recipe updated successfully!');
        } catch (error) {
            console.error('Error updating recipe:', error);
            alert('Failed to update recipe.');
        }
    };

    if (loading) {
        return <div
        className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid 
        border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status"></div>; 
    }

    return (
        <RecipeForm
            initialValues={initialValues}
            onSubmit={handleSubmit}
        />
    );
};

export default EditRecipe;
