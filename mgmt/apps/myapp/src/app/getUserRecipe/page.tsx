import { useState, useEffect } from "react";
import axios from "axios";

export default function getUserRecipe() {
  const [recipes, setRecipes] = useState<string[]>([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await axios.get('/api/getUserRecipe');
        setRecipes(res.data); // assuming the API returns a list of recipes
      } catch (e) {
        console.error(e);
      }
    };

    fetchRecipes();
  }, []); 
  return (
    <div>
      {recipes.map((recipe, index) => (
        <div key={index}>{recipe}</div>
      ))}
    </div>
  );
}
