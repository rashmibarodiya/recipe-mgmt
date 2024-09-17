import { Recipe, User } from '@repo/db';
import { connect } from '@repo/db/lib/dbConnect';
import { NextRequest, NextResponse } from 'next/server';



export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
    await connect();

    try {
        const { id } = params;
        const body = await req.json();
        const { points } = body;

      
        if (!points || points < 1 || points > 5) {
            return NextResponse.json({ message: 'Invalid rating value' }, { status: 400 });
        }

        
        const email = req.headers.get('email');
        if (!email) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

      
        const recipe = await Recipe.findById(id);
        if (!recipe) {
            return NextResponse.json({ message: 'Recipe not found' }, { status: 404 });
        }

        // Check if the user has already rated this recipe && here is any
        const existingRating = recipe.ratings.find((rating : any) => rating.user.toString() === user._id.toString());
        if (existingRating) {
            return NextResponse.json({ message: 'User has already rated this recipe' }, { status: 400 });
        }

        // Add the rating to the recipe
        recipe.ratings.push({ user: user._id, rating: points });
        
        // Save the recipe
        await recipe.save();

        return NextResponse.json({ message: 'Rating added successfully' }, { status: 200 });
    } catch (error) {
        console.error("Error while adding rating:", error);
        return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
    }
}
