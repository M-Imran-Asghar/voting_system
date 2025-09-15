import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    name:{
        type: String,
        required: [true, "Please Enter Name"]
    },
    email:{
        type: String,
        required: [true, "Please Enter email"],
        unique: true,

    },
    password:{
        type:String,
        required: [true, "Please Enter Password"],
    },
    IsAdmin:{
        type:Boolean,
        
    }
})

 const User = mongoose.models.users ||  mongoose.model("users", userSchema)

 export default User