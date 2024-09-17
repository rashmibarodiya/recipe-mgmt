import { Recipe, User } from '@repo/db';
import { connect } from '@repo/db/lib/dbConnect';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: { category: string } }) {
    await connect();

    console.log("Received request to fetch recipes by category");
    const { category } = params;
    

    try {
        // const email = req.headers.get('email');
        // if (!email) {
        //     console.log("No email available");
        //     return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        // }
        // console.log("email", email);

        // const user = await User.findOne({ email });
        // if (!user) {
        //     console.log("User not found");
        //     return NextResponse.json({ message: 'User not found' }, { status: 404 });
        // }
        // console.log("User found:", user);

        const recipes = await Recipe.find({ category }); 
        if (!recipes || recipes.length === 0) {
            console.log("No recipes available for category " + category);
            return NextResponse.json({ message: "No recipes available for category " + category }, { status: 404 });
        }

        return NextResponse.json({ message: 'Recipes retrieved successfully for category ' + category, recipes });

    } catch (err: any) {
        console.error('Error while retrieving recipes for category ' + category, err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
