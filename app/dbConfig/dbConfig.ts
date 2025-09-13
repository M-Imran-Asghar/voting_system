import mongoose from "mongoose";

export async function connect() {
    try {
        mongoose.connect(process.env.DATABASE_URI!)
        const connection = mongoose.connection

        connection.on("connected", () => {
            console.log("mongoDb connected");
            
        })

        connection.on("error", (err) => {
            console.log("mongoDb connection error" + err);
            process.exit()
            
        })
    } catch (error) {
        console.log("data base connection error");
        console.error(error);
        
    }
}