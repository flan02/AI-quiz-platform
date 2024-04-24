import mongoose from "mongoose";

const { MONGODB_URI } = process.env

if (!MONGODB_URI) {
  throw new Error("No mongo connection string. Set MONGODB_URI environment variable.");
}

let isConnected: boolean = false

export const connectDB = async () => {
  if (!isConnected) {
    try {
      const client = await mongoose.connect(MONGODB_URI)
      if (client.connection.readyState === 1) console.log("Connected to MongoDB")
      console.log("New connection to mongodb atlas cloud");
      isConnected = true
      return Promise.resolve(true)
    } catch (error) {
      console.log("Error connecting to MongoDB: ", error)
      return Promise.resolve(false)
    }
  }
  else console.log("Using existing connection to database")
}




