// pages/api/sortedRecipes.ts

import {NextResponse } from "next/server";
import {connect} from "@repo/db/lib/dbConnect"; // Ensure you have a connection utility
import {Recipe} from "@repo/db/src/"; // Adjust the path to your Recipe model
export async function GET() {
    await connect();
  
    try {
      const recipes = await Recipe.find({}).sort({ ratings: -1 }).limit(6);
      return NextResponse.json(recipes);
    } catch (error) {
      console.error("Error fetching sorted recipes:", error);
      return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
  }