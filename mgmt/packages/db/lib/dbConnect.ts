import mongoose from 'mongoose';

let isConnected = false; // Global flag to track the connection state

export async function connect() {
  if (isConnected) {
    console.log('Mongoose already connected');
    return;
  }

  try {
    const mongId = process.env.MONG!;

    await mongoose.connect(mongId, {
      dbName: 'recipes',
    });

    const connection = mongoose.connection;

    connection.once('connected', () => {
      console.log('Mongoose connection established');
      isConnected = true; // Mark as connected
    });

    connection.on('error', (err) => {
      console.log('MongoDB connection error. Please make sure MongoDB is running. ' + err);
      process.exit();
    });
  } catch (e) {
    console.error('Error occurred while connecting to MongoDB:', e);
  }
}
