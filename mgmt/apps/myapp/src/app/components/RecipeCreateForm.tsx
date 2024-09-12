// components/RecipeForm.tsx
"use client";
import React, { useState } from 'react';
import { Button } from "@repo/ui/src/button";
import { RecipeFormProps, Step, Ing } from '@/types/recipeForm';

const RecipeForm: React.FC<RecipeFormProps> = ({ initialValues, onSubmit }) => {
    const [title, setTitle] = useState(initialValues.title);
    const [des, setDes] = useState(initialValues.description);
    const [img, setImg] = useState(initialValues.image);
    const [category, setCategory] = useState(initialValues.category);
    const [otherCategory, setOtherCategory] = useState(initialValues.otherCategory || '');
    const [steps, setSteps] = useState<Step[]>(initialValues.steps);
    const [ings, setIngs] = useState<Ing[]>(initialValues.ingredients);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const recipeData = {
            title,
            description: des,
            image: img,
            category: category === 'Other' ? otherCategory : category,
            ingredients: ings.map(i => i.ing),
            steps: steps.map(s => s.step),
        };
        onSubmit(recipeData);
    };

    const handleIngChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        const newIngs = [...ings];
        newIngs[index] = { ...newIngs[index], ing: value };
        setIngs(newIngs);
    };

    const addIng = () => {
        setIngs([...ings, { ing: '' }]);
    };

    const removeIng = (index: number) => {
        const newIngs = ings.filter((_, ingIdx) => ingIdx !== index);
        setIngs(newIngs);
    };

    const handleStepChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        const newSteps = [...steps];
        newSteps[index] = { ...newSteps[index], step: value };
        setSteps(newSteps);
    };

    const addStep = () => {
        setSteps([...steps, { step: '' }]);
    };

    const removeStep = (index: number) => {
        const newSteps = steps.filter((_, stepIndex) => stepIndex !== index);
        setSteps(newSteps);
    };

    return (
        <div className="text-black max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden md:max-w-2xl pt-15 p-6 space-y-4">
            <form onSubmit={handleSubmit}>
                <div className='ml-4 mr-4'>
                    <h2 className="text-2xl font-bold mb-4">
                        {initialValues.title ? 'Edit Recipe' : 'Add New Recipe'}
                    </h2>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                            Title:
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Add title"
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            />
                        </label>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                            Description:
                            <input
                                type="text"
                                value={des}
                                onChange={(e) => setDes(e.target.value)}
                                placeholder="Add description"
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            />
                        </label>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                            Image URL:
                            <input
                                type="text"
                                value={img}
                                onChange={(e) => setImg(e.target.value)}
                                placeholder="Add image URL"
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            />
                        </label>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                            Category:
                            <select
                                value={category}
                                onChange={(e) => {
                                    setCategory(e.target.value);
                                    if (e.target.value !== 'Other') {
                                        setOtherCategory('');
                                    }
                                }}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            >
                                <option value="">Select a category</option>
                                <option value="Dessert">Dessert</option>
                                <option value="Chinese">Chinese</option>
                                <option value="Italian">Italian</option>
                                <option value="Italian">Vegetarian</option>
                                <option value="Beverages">Beverages</option>
                                <option value="Other">Other</option>
                            </select>
                        </label>
                    </div>

                    {category === 'Other' && (
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">
                                Specify Category:
                                <input
                                    type="text"
                                    value={otherCategory}
                                    onChange={(e) => setOtherCategory(e.target.value)}
                                    placeholder="Specify other category"
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                />
                            </label>
                        </div>
                    )}

                    <div className="mb-4">
                        <h3 className="text-lg font-semibold">Add Ingredients</h3>
                        {ings.map((ing, index) => (
                            <div key={index} className="flex items-center mb-2">
                                <input
                                    type="text"
                                    value={ing.ing}
                                    onChange={(e) => handleIngChange(index, e)}
                                    placeholder={`Ingredient ${index + 1}`}
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                />
                                {ings.length > 1 && (
                                    <Button type="button" color="red" onClick={() => removeIng(index)} className="ml-2">
                                        Remove
                                    </Button>
                                )}
                            </div>
                        ))}
                        <Button type="button" onClick={addIng} className="mt-2">
                            Add Ingredient
                        </Button>
                    </div>

                    <div className="mb-4">
                        <h3 className="text-lg font-semibold">Add Recipe Steps</h3>
                        {steps.map((step, index) => (
                            <div key={index} className="flex items-center mb-2">
                                <input
                                    type="text"
                                    value={step.step}
                                    onChange={(e) => handleStepChange(index, e)}
                                    placeholder={`Describe step ${index + 1}`}
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                />
                                {steps.length > 1 && (
                                    <Button type="button" color="red" onClick={() => removeStep(index)} className="ml-2">
                                        Remove
                                    </Button>
                                )}
                            </div>
                        ))}
                        <Button type="button" onClick={addStep} className="mt-2">
                            Add Step
                        </Button>
                    </div>

                    <Button type="submit" className="w-full mt-4">
                        {initialValues.title ? 'Update Recipe' : 'Submit Recipe'}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default RecipeForm;