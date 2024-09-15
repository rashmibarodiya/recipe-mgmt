
import { Feedback, Recipe, User } from '@repo/db';
import { connect } from '@repo/db/lib/dbConnect';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest,{ params }: { params: { id: string } }) {
    await connect();

    console.log("Received request to add a review");

    try {
        const { id } = params;
        const body = await req.json();
        console.log("Request body:", body);

        const {review} = body;

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
        }else{
            const feedback = new Feedback(review,user,recipe)
            await feedback.save();
            return NextResponse.json({message: 'Review added'},{status : 200})
        }
    }catch(e){
        console.log("something went wrong while adding review : ",e)
        return NextResponse.json({message:"something went wrong while adding review"},{status : 500})
    }
}