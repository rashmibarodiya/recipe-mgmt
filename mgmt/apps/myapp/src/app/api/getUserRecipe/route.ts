import { User } from "@repo/db";
import { NextRequest, NextResponse } from "next/server"

import { connect } from "@repo/db/lib/dbConnect"

export default async function GET(req: NextRequest) {
    
    const email = req.headers.get('email');
    if (!email) {
        console.log("No email available");
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    try {
        await connect();
        const user = await User.findOne({ email })
        const recipes = user.recipes;
        if (!recipes) {
            return NextResponse.json({
                msg: "No recipes exists for this user"
            })
        } else {
            return NextResponse.json({
                msg: "recipes retrieved successfully",
                recipes
            })
        }
    } catch (err: any) {
        console.error('Error fetching user recipe:', err);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }

}
