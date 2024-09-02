import { NextResponse } from "next/server";
import { Recipe } from "@repo/db";
import { connect } from "@repo/db/lib/dbConnect"


export async function GET() {


    try {
        await connect();
        const recipes = await Recipe.find()

        if (!recipes) {
            return NextResponse.json({
                msg: "no recipes here"
            })
        }
        return NextResponse.json({
            recipes
        })
    } catch (err: any) {
        console.error('Error fetching  all recipe:', err);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}