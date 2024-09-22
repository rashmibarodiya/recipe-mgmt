import { NextResponse } from "next/server";
import { connect } from "@repo/db/lib/dbConnect";
import { Recipe } from "@repo/db/src/";

export async function GET(request: Request) {
  await connect();

  const { searchParams } = new URL(request.url);
  const skip = parseInt(searchParams.get("skip") || "0"); 
  const limit = parseInt(searchParams.get("limit") || "6");


  try {
    const recipes = await Recipe.find({})
      .sort({ ratings: -1 })
      .skip(skip)
      .limit(limit);
    return NextResponse.json(recipes);
  } catch (error) {
    console.error("Error fetching sorted recipes:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
