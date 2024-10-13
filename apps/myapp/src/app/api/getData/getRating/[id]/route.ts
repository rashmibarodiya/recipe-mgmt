import { Recipe } from "@repo/db";
import { connect } from "@repo/db/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
 

  try {
    console.log("Received request to get rating by Recipe ID");
    await connect();
    const { id } = params;
    console.log("Recipe ID:", id);

    if (!id) {
      return NextResponse.json({ message: "Recipe ID is required" }, { status: 400 });
    }

    // Fetch recipe with ratings
    const recipe = await Recipe.findById(id);

    if (!recipe) {
      return NextResponse.json({ message: "Recipe not found" }, { status: 404 });
    }

    // Calculate average rating
    const avgRating = (ratings: { rating: number }[]): number => {
      if (!ratings || ratings.length === 0) return 0;
      const totalRating = ratings.reduce((acc, { rating }) => acc + rating, 0);
      return totalRating / ratings.length;
    };

    const averageRating = avgRating(recipe.ratings);

    return NextResponse.json({ avgRating: averageRating }, { status: 200 });

  } catch (e) {
    console.log("Something went wrong while fetching reviews: ", e);
    return NextResponse.json({ message: "Something went wrong while getting the reviews" }, { status: 500 });
  }
}
