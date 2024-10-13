
export interface Step {
    step: string;
}

export interface Ing {
    ing: string;
}

export interface RecipeFormProps {
    initialValues: {
        title: string;
        description: string;
        image: string;
        category: string;
        otherCategory: string;
        steps: Step[];
        ingredients: Ing[];
    };
    onSubmit: (recipeData: any) => void;
}
