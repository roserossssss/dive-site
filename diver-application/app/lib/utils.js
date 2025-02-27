import mongoose from "mongoose";

export const connectToDB = async () => {

const connection = {}

    try {
        if(connection.isConnected) return;
        const db = await mongoose.connect("mongodb+srv://User:Login1234@cluster0.fnkw8.mongodb.net/dashboard?retryWrites=true&w=majority&appName=Cluster0");
        connection.isConnected = db.connections[0].readyState
      } catch (error) {
        console.log(error)
        throw new Error(error);
      }

}