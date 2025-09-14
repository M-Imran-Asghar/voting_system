import mongoose from "mongoose";

export async function connect() {
    try {
        const uri = process.env.DATABASE_URI
        // "mongodb+srv://imranasghar:imran123@voting-app.xb1xnsj.mongodb.net/?retryWrites=true&w=majority&appName=voting-app"; 
    if (!uri) {
      throw new Error("DATABASE_URI is not defined in .env");
    }
    console.log("DB uri", uri)
        mongoose.connect(uri)
        const connection = mongoose.connection

        connection.on("connected", () => {
            console.log("mongoDb connected");
            
        })

        connection.on("error", (err) => {
            console.log("mongoDb connection error" + err);
            process.exit(1)
            
        })
    } catch (error) {
        console.log("data base connection error");
        console.error(error);
        
    }
}