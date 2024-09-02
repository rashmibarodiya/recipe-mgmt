


import { NextRequest, NextResponse } from 'next/server';
import { Recipe } from '@repo/db';
import { connect } from "@repo/db/lib/dbConnect"


export async function GET(req :NextRequest,{ params }: { params: { id: string } }) {
    const { id } = params;

    try {

        await connect();
        const recipe = await Recipe.findById(id);

        if (!recipe) {
            return NextResponse.json({ message: 'Recipe not found' }, { status: 404 });
        }

        return NextResponse.json(recipe);

    } catch (err: any) {
        console.error('Error fetching recipe:', err);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
