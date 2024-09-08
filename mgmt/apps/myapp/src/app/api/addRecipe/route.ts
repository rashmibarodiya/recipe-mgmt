import { Recipe, User } from '@repo/db';
import { connect } from '@repo/db/lib/dbConnect';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    await connect(); 

    console.log("Received request to add recipe");

    try {
        const body = await req.json();
        console.log("Request body:", body);

        const { title, description, ingredients, steps, category } = body;

        // Extract the user ID from the request headers
        const userId = req.headers.get('user-id');
        if (!userId) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        
        const recipe = new Recipe({
            title,
            description,
            ingredients,
            steps,
            category,
            user: userId,
        });

        // Save the recipe to the database
        await recipe.save();
        console.log("Recipe saved successfully");

        return NextResponse.json({ message: 'Recipe added successfully', recipeId: recipe._id });
    } catch (err :any) {
        console.error('Error while adding recipe:', err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
