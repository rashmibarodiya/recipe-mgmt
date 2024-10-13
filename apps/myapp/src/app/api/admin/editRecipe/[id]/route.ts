import { Recipe, User } from '@repo/db';
import { connect } from '@repo/db/lib/dbConnect';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    await connect();

    console.log("Received request to edit recipe");

    try {
        const { id } = params;
        const body = await req.json();
        console.log("Request body:", body);

        const { title, description, ingredients, steps, category, image } = body;

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

        let recipe = await Recipe.findById(id);
        if (!recipe) {
            console.log("Recipe not found");
            return NextResponse.json({ message: 'Recipe not found' }, { status: 404 });
        }

        if (!recipe.author.equals(user._id)) {
            console.log("User is not authorized to update this recipe");
            return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
        }

        
        recipe.title = title;
        recipe.description = description;
        recipe.image = image;
        recipe.ingredients = ingredients;
        recipe.steps = steps;
        recipe.category = category;

       
        await recipe.save();
        console.log("Recipe updated successfully");
        return NextResponse.json({ message: 'Recipe updated successfully', recipeId: recipe._id });

    } catch (err: any) {
        console.error('Error while updating recipe:', err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
