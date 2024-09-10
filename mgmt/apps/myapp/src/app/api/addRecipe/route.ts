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

    
        const email = req.headers.get('email');
        if (!email) {
            console.log("No email available");
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }
        console.log("email", email);

       
        const user = await User.findOne({ email });
        if (!user) {
            console.log("User not found");
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }
        console.log("User found:", user);

        // Create a new recipe and associate it with the user
        const recipe = new Recipe({
            title,
            description,
            ingredients,
            steps,
            category,
            author: user._id, 
        });
        console.log(recipe);

        // Save the recipe to the database
        await recipe.save();
      
        user.recipes.push(recipe._id);  
        await user.save();
        console.log("Recipe saved successfully");
        return NextResponse.json({ message: 'Recipe added successfully', recipeId: recipe._id });
    } catch (err: any) {
        console.error('Error while adding recipe:', err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
