import { User } from "@repo/db";
import { NextRequest, NextResponse } from "next/server"
import { connect } from "@repo/db/lib/dbConnect"

export async function GET(req: NextRequest) {
    console.log("i am herereee  eee")
    const email = req.headers.get('email');
    if (!email) {
        console.log("No email available");
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    try {
        await connect();

        // Find the user by email and populate the 'recipes' field with actual recipe data
        const user = await User.findOne({ email }).populate('recipes');
        console.log(user)
        if (!user || !user.recipes || user.recipes.length === 0) {

            return NextResponse.json({
                msg: "No recipes exist for this user"
            });
        }

        console.log("recipes retrieved successfully", user.recipes);

        return NextResponse.json({
            msg: "Recipes retrieved successfully",
            recipes: user.recipes,
            author : user
        });
    } catch (err: any) {
        console.error('Error fetching user recipes:', err);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
