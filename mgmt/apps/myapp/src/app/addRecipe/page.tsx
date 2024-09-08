"use client";

import React, { useState } from 'react';
import { Button } from "@repo/ui/button";

interface Step {
    step: string;
}

interface Ing {
    ing: string;
}

const AddRecipe = () => {
    const [title, setTitle] = useState("");
    const [des, setDes] = useState("");
    const [category, setCategory] = useState("");
    const [steps, setSteps] = useState<Step[]>([{ step: '' }]);
    const [ings, setIngs] = useState<Ing[]>([{ ing: '' }]);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        
        const recipeData = {
            title,
            description: des,
            category,
            ingredients: ings.map(i => i.ing),
            steps: steps.map(s => s.step),
        };

        try {
            const response = await fetch('/api/addRecipe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(recipeData),
            });

            const data = await response.json();
            console.log('Response:', data);
        } catch (error) {
            console.error('Error submitting recipe:', error);
        }
    };

      // Add ingredient and step handling functions here
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
        <div style={{ display: "flex", minHeight: "20vh", marginTop: 100 }}>
            <div style={{ minWidth: "30vw" }}></div>

            <div style={{ flex: 1, padding: "2rem", minWidth: "25vw", backgroundColor: "white" }}>
                <form onSubmit={handleSubmit}>
                    <h2>Add New Recipe</h2>

                    <div>
                        <label>
                            Title:
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Add title"
                            />
                        </label>
                    </div>

                    <div>
                        <label>
                            Description:
                            <input
                                type="text"
                                value={des}
                                onChange={(e) => setDes(e.target.value)}
                                placeholder="Add description"
                            />
                        </label>
                    </div>

                    <div>
                        <label>
                            Category:
                            <input
                                type="text"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                placeholder="Add category"
                            />
                        </label>
                    </div>
                    <br />
                    <div>
                        <h2>Add Ingredients</h2>
                        {ings.map((ing, index) => (
                            <div key={index} className="step-input-container">
                                <label>Ingredient {index + 1} : </label>
                                <input
                                    type="text"
                                    name="ing"
                                    value={ing.ing}
                                    onChange={(e) => handleIngChange(index, e)}
                                    placeholder={`Ingredient ${index + 1}`}
                                    className="step-input"
                                />
                                {ings.length > 1 && (
                                    <Button type="button" color="red" onClick={() => removeIng(index)} className="remove-step-btn">
                                        Remove
                                    </Button>
                                )}
                            </div>
                        ))}
                        <Button type="button" onClick={addIng} className="add-step-btn">
                            Add Ingredient
                        </Button>
                    </div>
                    <br />
                    <div>
                        <h2>Add Recipe Steps</h2>
                        {steps.map((step, index) => (
                            <div key={index} className="step-input-container">
                                <label>Step {index + 1} : </label>
                                <input
                                    type="text"
                                    name="step"
                                    value={step.step}
                                    onChange={(e) => handleStepChange(index, e)}
                                    placeholder={`Describe step ${index + 1}`}
                                    className="step-input"
                                />
                                {steps.length > 1 && (
                                    <Button type="button" color="red" onClick={() => removeStep(index)} className="remove-step-btn">
                                        Remove
                                    </Button>
                                )}
                            </div>
                        ))}
                        <Button type="button" onClick={addStep} className="add-step-btn">
                            Add Step
                        </Button>
                    </div>

                    <Button type="submit" className="submit-btn">
                        Submit Recipe
                    </Button>
                </form>
            </div>

            <div style={{ minWidth: "30vw" }}></div>
        </div>
    );
}
  
export default AddRecipe;
