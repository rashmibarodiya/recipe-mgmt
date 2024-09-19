export default interface Recipe {
    _id?: string,
    title: string;
    description: string;
    ingredients: string[];
    image: string;
    steps: string[];
    category: 'Dessert' | 'Chinese' | 'Italian' | 'Vegetarian' | 'Beverages' | 'Other';
    otherCategory?: string;
    feedback?: string[];
    ratings?: number[];
    authorName:string;
    author: string;
}

export interface RecipeDisplayProps {
    recipe: Recipe;
    author?: string;
     mine?: boolean;
    id:string;
    color?: string;
}

