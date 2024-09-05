'use client'


import React, { useState } from 'react';
import {Button} from "@repo/ui/button"
interface Step {
  step: string;
}

const RecipeStepsForm = () => {
  const [steps, setSteps] = useState<Step[]>([{ step: '' }]);

  // Function to handle input change
  const handleStepChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const newSteps = [...steps];
    newSteps[index] = { ...newSteps[index], [name]: value };
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
    <div style={{ display: "flex", minHeight: "20vh", marginTop: 100 }}>
    <div style={{ minWidth: "30vw" }}></div>
   
    {/* <div style={{ flex: 1, padding: "2rem", minWidth: "25vw", backgroundColor: "#f4f4f4" }}> */}
    <div style={{ flex: 1, padding: "2rem", minWidth: "25vw", backgroundColor: "white" }}>


    <form onSubmit={handleSubmit}>
      <h2>Add Recipe Steps</h2>

      {steps.map((step, index) => (
        <div key={index} className="step-input-container">
          <label>Step {index + 1}</label>
          <input
            type="text"
            name="step"
            value={step.step}
            onChange={(event) => handleStepChange(index, event)}
            placeholder={`Describe step ${index + 1}`}
            className="step-input"
          />
          {steps.length > 1 && (
            <Button type="button" color = "red" onClick={() => removeStep(index)} className="remove-step-btn">
              Remove
            </Button>
          )}
        </div>
      ))}

      <Button type="button"  onClick={addStep} className="add-step-btn">
        Add Step
      </Button>

      <Button type="submit" className="submit-btn">
        Submit Recipe
      </Button>
    </form>
    
    </div>
    <div style={{ minWidth: "30vw" }}></div>
    </div>
    
  );
};


async function addIngredients(){
    return(
        <>
        <div>
            
        </div>
        </>
    )
}
export default RecipeStepsForm;
