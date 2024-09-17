import { Feedback, Recipe, User } from "@repo/db";
import { connect } from "@repo/db/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  await connect();

  try {
    console.log("Received request to fetch review by Recipe ID");
    
    const { id } = params;  
    console.log("id************************", id);

    if (!id) {
      return NextResponse.json({ message: "Recipe ID is required" }, { status: 400 });
    }

    
    const recipe = await Recipe.findById(id).populate({
      path: 'feedback',
      populate: {
        path: 'user',
        select: 'username'
      }
    });

    if (!recipe) {
      return NextResponse.json({ message: "Recipe not found" }, { status: 404 });
    }

   
    const reviews = recipe.feedback.map((feedbackItem: any) => ({
      review: feedbackItem.review,
      username: feedbackItem.user.username,
      createdAt: feedbackItem.createdAt
    }));

    
    return NextResponse.json({ reviews }, { status: 200 });

  } catch (e) {
    console.log("Something went wrong while fetching reviews: ", e);
    return NextResponse.json({ message: "Something went wrong while getting the reviews" }, { status: 500 });
  }
}
