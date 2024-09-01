

import mongoose from 'mongoose'

export async function connect() {
    try {
        const mongId = process.env.MONG!
        //console.log(mongId)

        await mongoose.connect(mongId, {
            dbName: 'recipes'
        })
        const connection = mongoose.connection

        connection.on('connected', () => {
            console.log('Mongoose connection established');


            connection.on('error', (err) => {
                console.log('MongoDB connection error. Please make sure MongoDB is running. ' + err);
                process.exit();
            });
        })
    } catch (e) {
        console.log('Something went wrong!');
        //   console.log(err);
        console.error("error occured " + e)
    }
}