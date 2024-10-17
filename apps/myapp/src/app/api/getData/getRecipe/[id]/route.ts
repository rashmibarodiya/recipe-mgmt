import type { NextApiRequest, NextApiResponse } from 'next';
import { Recipe, User } from "@repo/db";
import { connect } from "@repo/db/lib/dbConnect";
import { NextResponse } from 'next/server';


export async function GET(req: Request, { params }: { params: { id: string } }) {
  console.log("aaya to hu")
  const { id } = params; 
  console.log(id)
  try {

    await connect();
    const recipe = await Recipe.findById(id);

    if (!recipe) {
      return NextResponse.json({ msg: "Recipe not found" }, { status: 404 });
    }

    const user = await User.findById(recipe.author)
    // console.log(recipe)
    return NextResponse.json({
      recipe,user
    });
  } catch (err: any) {
    console.error('Error fetching recipe by ID:', err);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
