// app/admin/addRecipe/page.tsx
"use client";
import RecipeForm from '../../components/RecipeCreateForm';
import { RecipeFormProps, Step, Ing } from '@/types/recipeForm';
import axios from 'axios';
const AddRecipe = () => {

    const handleSubmit = async (recipeData: any) => {
        try {
            const response = await axios.post(`/api/admin/addRecipe`, recipeData, {
                headers: { 'Content-Type': 'application/json' },
            });
            console.log('Response:', response.data);
            alert(JSON.stringify(response.data));
        } catch (error) {
            console.error('Error submitting recipe:', error);
            alert(error);
        }
    };

    return (
        <div className='mt-50'>
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
            ></RecipeForm>
        </div>
        
      
    );
};

export default AddRecipe;
