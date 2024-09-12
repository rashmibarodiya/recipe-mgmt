export default interface Recipe {
    _id?: string,
    title: string;
    description: string;
    ingredients: string[];
    image: string;
    steps: string[];
    category: 'Dessert' | 'Chinese' | 'Italian' | 'Beverages' | 'Other';
    otherCategory?: string;
    feedback?: string[];
    ratings?: number[];
    author: string;
}

export interface RecipeDisplayProps {
    recipe: Recipe;
    author ?:string;
}

