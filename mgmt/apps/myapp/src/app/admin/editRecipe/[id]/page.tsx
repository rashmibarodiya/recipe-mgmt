// app/admin/editRecipe/[id]/page.tsx
"use client";
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import RecipeForm from '../../../components/RecipeCreateForm'; // Ensure the correct import here
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
                    alert(JSON.stringify(initialValues))
                } catch (error) {
                    console.error('Error fetching recipe:', error);
                }
            }
        };
        fetchRecipe();
    }, [id]);

    const handleSubmit = async (recipeData: any) => {
        try {
            const response = await fetch(`/api/admin/updateRecipe/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(recipeData),
            });
            const data = await response.json();
            console.log('Response:', JSON.stringify(data));
            alert('Recipe updated successfully!');
        } catch (error) {
            console.error('Error updating recipe:', error);
            alert('Failed to update recipe.');
        }
    };

    return (
        <RecipeForm
            initialValues={initialValues}
            onSubmit={handleSubmit}
        />
    );
};

export default EditRecipe;
