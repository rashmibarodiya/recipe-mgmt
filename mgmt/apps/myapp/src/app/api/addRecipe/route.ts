

import { Recipe } from '@repo/db'
import { connect } from '@repo/db/lib/dbConnect'
import { NextRequest, NextResponse } from 'next/server'
import authenticate from '../../../middleware'


export default async function POST(req: NextRequest, res: NextResponse) {
    await connect()
    const { authenticated, user, message } = authenticate(req)
    if (!authenticate) {
        return NextResponse.json({ message }, { status: 401 })
    } else {

        try {
            const { title, description, ingredients, steps, category } = await req.json()

            const recipe = new Recipe({ title, description, ingredients, steps, category, user });

            await recipe.save()

            console.log(recipe)
            return NextResponse.json({ message: 'recipe added successfully', recipeId: recipe._id })

        } catch (err: any) {
            console.log("Something went wrong")
            console.log(err)
            return NextResponse.json({ err: err.message }, { status: 500 })
        }

    }

}