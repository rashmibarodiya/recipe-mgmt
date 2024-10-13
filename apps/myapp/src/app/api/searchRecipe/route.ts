

// app/api/search/route.ts
import { NextResponse } from 'next/server';
import { connect } from '@repo/db//lib/dbConnect'; // Adjust the import path
import {Recipe} from '@repo/db/src/'; // Adjust the import path

export async function GET(request: Request) {
    const url = new URL(request.url);
    const query = url.searchParams.get('query') || '';
  
    if (!query) {
      return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 });
    }
  
    try {
        await connect();
      const results = await searchRecipesByQuery(query);
      if(results.length > 0) {
      return NextResponse.json(results);
      } else {
        return NextResponse.json({ message: 'No results found'},{status:400});
      }
    } catch (error) {
      console.error('Error searching recipes:', error);
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
  }


  
async function searchRecipesByQuery(query: string) {
// console.log("hi its begining")
  // Full-text search
  const fullTextResults = await Recipe.find({
    $text: { $search: query },
  }).sort({ score: { $meta: "textScore" } }).exec();

  if (fullTextResults.length > 0) {
    return fullTextResults;
  }

  // Fallback to regex search
  const searchTerms = query.split(' '); // Split "easy pancake" into ['easy', 'pancake']
  const regexResults = await Recipe.find({
    $and: searchTerms.map(term => ({
      $or: [
        { title: { $regex: term, $options: 'i' } },
        { description: { $regex: term, $options: 'i' } },
        { ingredients: { $elemMatch: { $regex: term, $options: 'i' } } }
      ],
    })),
  }).exec();



  return regexResults;
}