import mongoose from "mongoose";
import { Recipe } from "../src";

let isConnected = false;

export async function connect() {
  if (isConnected) {
    console.log("Mongoose already connected");
    return;
  }

  try {
    const mongId = process.env.MONG;

    if (!mongId) {
      throw new Error('MONG environment variable is not defined');
    }

    await mongoose.connect(mongId, {
      dbName: "recipes",
    });

    const connection = mongoose.connection;

    connection.once("connected", async () => {
      console.log("Mongoose connection established");

      
      try {
        
        await Recipe.collection.createIndex(
          {
            title: 'text',
            description: 'text',
            ingredients: 'text'
          },
          {
            weights: { title: 10, description: 5, ingredients: 1 }
          }
        );

        console.log("Text indexes created successfully");
      } catch (indexError) {
        console.error("Error creating indexes:", indexError);
      }

      isConnected = true; 
    });

    connection.on("error", (err) => {
      console.error("MongoDB connection error. Please make sure MongoDB is running. " + err);
      process.exit(1); 
    });
  } catch (e) {
    console.error("Error occurred while connecting to MongoDB:", e);
    process.exit(1); 
  }
}
