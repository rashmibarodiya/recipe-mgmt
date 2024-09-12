// app/admin/addRecipe/page.tsx
"use client";
import RecipeForm from '../../components/RecipeCreateForm';
import { RecipeFormProps,Step,Ing } from '@/types/recipeForm';

const AddRecipe = () => {
    const handleSubmit = async (recipeData: any) => {
        try {
            const response = await fetch('/api/addRecipe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(recipeData),
            });
            const data = await response.json();
            console.log('Response:', JSON.stringify(data));
            alert(JSON.stringify(data));
        } catch (error) {
            console.error('Error submitting recipe:', error);
            alert(error);
        }
    };

    return (
        <RecipeForm
            initialValues={{
                title: '',
                description: '',
                image: '',
                category: '',
                otherCategory: '',
                steps: [{ step: '' }],
                ingredients: [{ ing: '' }],
            }}
            onSubmit={handleSubmit}
        />
    );
};

export default AddRecipe;
