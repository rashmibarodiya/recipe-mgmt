import { User } from "@repo/db";
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@repo/db/lib/dbConnect";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    console.log("Request received to get user recipes");

    // Get the id from query parameters
    const { id } = params; 
  console.log(id)

    console.log("id:", id);
    if (!id) {
      console.log("No id available");
      return NextResponse.json({ message: 'No id given' }, { status: 401 });
    }

    await connect();

    
    const user = await User.findById(id).populate('recipes');
    console.log(user);
    
    if (!user || !user.recipes || user.recipes.length === 0) {
      return NextResponse.json({
        msg: "No recipes exist for this user"
      });
    }

    console.log("Recipes retrieved successfully:", user.recipes);

    return NextResponse.json({
      msg: "Recipes retrieved successfully",
      recipes: user.recipes,
    });
  } catch (err: any) {
    console.error('Error fetching user recipes:', err);
    return NextResponse.json({ message: 'Error while fetching the user recipes' }, { status: 500 });
  }
}
