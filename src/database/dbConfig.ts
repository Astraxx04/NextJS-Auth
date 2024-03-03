import mongoose from "mongoose";

export async function connect() {
    try {
        mongoose.connect(process.env.MONGO_URI!);
        const connection = mongoose.connection;
        connection.on('connected', () => {
            console.log("Connected to database successfully!");
        });
        connection.on('error', (error) => {
            console.log("Error connecting to database. Error: " + error);
        });
    }
    catch(err) {
        console.log("Error connecting to database!");
    }
}