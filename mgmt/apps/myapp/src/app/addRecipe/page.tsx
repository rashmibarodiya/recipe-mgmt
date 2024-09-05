"use client";

import React, { useState } from 'react';
import { Button } from "@repo/ui/button";

interface Step {
    step: string;
}

interface Ing {
    ing: string;
}



function AddRecipe() {
    return (
        <>
            <div>
                <div style={{ display: "flex", minHeight: "20vh", marginTop: 100 }}>
                    <div style={{ minWidth: "30vw" }}></div>

                    <div style={{ flex: 1, padding: "2rem", minWidth: "25vw", backgroundColor: "white" }}>

                        <AddIngredients />
                        <RecipeStepsForm />

                    </div>
                    <div style={{ minWidth: "30vw" }}></div>
                </div>
            </div>
        </>
    )
}


const RecipeStepsForm = () => {
    const [steps, setSteps] = useState<Step[]>([{ step: '' }]);

    // Function to handle step input change
    const handleStepChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        const newSteps = [...steps];
        newSteps[index] = { ...newSteps[index], step: value };
        setSteps(newSteps);
    };

    // Function to add a new step
    const addStep = () => {
        setSteps([...steps, { step: '' }]);
    };

    // Function to remove a step
    const removeStep = (index: number) => {
        const newSteps = steps.filter((_, stepIndex) => stepIndex !== index);
        setSteps(newSteps);
    };

    // Handle form submission
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        console.log(steps);
        // Handle recipe steps submission logic here
    };

    return (


        <form onSubmit={handleSubmit}>
            <h2>Add Recipe Steps</h2>

            {steps.map((step, index) => (
                <div key={index} className="step-input-container">
                    <label>Step {index + 1} : </label>
                    <input
                        type="text"
                        name="step"
                        value={step.step}
                        onChange={(event) => handleStepChange(index, event)}
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

            <Button type="submit" className="submit-btn">
                Submit Recipe
            </Button>
        </form>

    );
};

const AddIngredients = () => {
    const [ings, setIngs] = useState<Ing[]>([{ ing: '' }]);

    // Function to handle ingredient input change
    const handleIngChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        const newIngs = [...ings];
        newIngs[index] = { ...newIngs[index], ing: value };
        setIngs(newIngs);
    };

    // Function to add a new ingredient
    const addIng = () => {
        setIngs([...ings, { ing: '' }]);
    };

    // Function to remove an ingredient
    const removeIng = (index: number) => {
        const newIngs = ings.filter((_, ingIdx) => ingIdx !== index);
        setIngs(newIngs);
    };

    // Handle form submission for ingredients
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        console.log(ings);
        // Handle ingredient submission logic here
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h2>Add Ingredients</h2>

                {ings.map((ing, index) => (
                    <div key={index} className="step-input-container">
                        <label>Ingredient {index + 1} : </label>
                        <input
                            type="text"
                            name="ing"
                            value={ing.ing}
                            onChange={(event) => handleIngChange(index, event)}
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

                <Button type="submit" className="submit-btn">
                    Submit Ingredients
                </Button>
            </form>
        </div>
    );
};

export default AddRecipe;
