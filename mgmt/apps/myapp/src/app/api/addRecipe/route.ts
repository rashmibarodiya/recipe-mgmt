import { Recipe ,User } from '@repo/db';
import { connect } from '@repo/db/lib/dbConnect';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest, res: NextResponse) {
    await connect();
console.log("kya hjgh aaya hu")
    try {
        const body = await req.json()
        console.log(body)
        const { title, description, ingredients, steps, category } = body;

        // Assume the user ID is extracted by the middleware and passed in the request headers
        // const userId = req.headers.get('user-id');
        // if (!userId) {
        //     return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        // }

        // const recipe = new Recipe({ title, description, ingredients, steps, category, user: userId });

        // await recipe.save();
console.log("recipe saved ")
      //  return NextResponse.json({ message: 'Recipe added successfully', recipeId: recipe._id });
        return NextResponse.json({ message: 'Recipe added successfully', recipeId: 4 });

    } catch (err: any) {
        console.error('Something went wrong:', err);
        return NextResponse.json({ err: err.message }, { status: 500 });
    }
}
