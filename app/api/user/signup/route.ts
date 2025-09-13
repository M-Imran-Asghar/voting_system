import { connect } from "@/app/dbConfig/dbConfig";
import User from "@/app/Models/userModel";
import { NextRequest, NextResponse } from "next/server"
import bcryptjs from "bcryptjs";

connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = request.json()
        const {name, email, passsword} = reqBody

        console.log("reqBody", reqBody);

        const user = await User.findOne({email})
        if(user){
            return NextResponse.json({
                error: "User already Exist"
            },
            {status: 400}
        )}
        
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(passsword, salt)

        const newUser = new User({
            name,
            email,
            password: hashedPassword
        })

        const savedUser = await newUser.save()
        console.log("Saved User ", savedUser);

        return NextResponse.json({
            message: "User Saved Successfully",
            success:true,
            savedUser
        })
        
        
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}