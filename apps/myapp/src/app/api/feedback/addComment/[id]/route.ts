
import { Feedback, Recipe, User } from '@repo/db';
import { connect } from '@repo/db/lib/dbConnect';
import { error } from 'console';
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
console.log("this is the id",id)
        // console.log(recipe)
        if (!recipe) {
            console.log("Recipe not found");
            return NextResponse.json({ message: 'Recipe not found' }, { status: 404 });
        }else{
            const feedback = new Feedback({
                review: review,
                user: user._id,
                recipe: recipe._id,
              });
          console.log("feedback is this now ",feedback)
              await feedback.save(); 
              recipe.feedback.push(feedback._id)           
                try{ await recipe.save(); 
                    console.log("no problem encounterd in here then whats wrong ")
                }catch(e :any){
                    console.log("this the inside error ")
                    throw new Error(e)

                }
             
             
            return NextResponse.json({message: 'Review added'},{status : 200})
        }
    
    }catch(e){
        console.log("something went wrong while adding review : ",e)
        return NextResponse.json({message:"something went wrong while adding review"},{status : 500})
    }
}