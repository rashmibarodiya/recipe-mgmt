import { User } from "@repo/db";
import { NextRequest, NextResponse } from "next/server"

import { connect } from "@repo/db/lib/dbConnect"

export default async function GET(req: NextRequest) {
    return NextResponse.json({
                    msg: "No recipes exists for this user"
                })
    // const userId = req.id; // need to change it

    // try {
    //     await connect();
    //     const user = await User.findOne({ userId })
    //     const recipes = user.recipes;
    //     if (!recipes) {
    //         return NextResponse.json({
    //             msg: "No recipes exists for this user"
    //         })
    //     } else {
    //         return NextResponse.json({
    //             msg: "recipes retrieved successfully",
    //             recipes
    //         })
    //     }
    // } catch (err: any) {
    //     console.error('Error fetching user recipe:', err);
    //     return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    // }

}
