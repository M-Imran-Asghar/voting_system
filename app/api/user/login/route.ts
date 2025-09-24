import { connect } from "@/app/dbConfig/dbConfig";
import User from "@/app/Models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken"

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody =await request.json() 
    const { email, password } = reqBody
    
    const user = await User.findOne({ email })

    if(!user){
        return NextResponse.json(
            {message: "User does not exist"},
            {status: 401}
        )
    }

    const validatePassword =await bcryptjs.compare(password, user.password)

    if(!validatePassword){
        return NextResponse.json(
            {message: "Incoreect password"},
            {status: 401}
        )
    }

    const tokenData = {
        id: user._id,
        email: user.email,
        isAdmin: user.IsAdmin
    }
    
    // const TOKEN_SECRAT= process.env.TOKEN_SECRET!
    const TOKEN_SECRAT= "abcedfghjklmnopqrstuvwxyzABCDEFGHJKLMNOPQRSTUVWXYZ1234567890"
    
    const token = jwt.sign(tokenData, TOKEN_SECRAT, {expiresIn: "1d"})


    const response = NextResponse.json({
        message: "LoggedIn Successfully",
        success: true,
        token
    })

    response.cookies.set("token", token, {
        httpOnly: true
    })

    return response
    } catch (error: any) {
        return NextResponse.json(
            {error: error.message},
            {status: 500}
        )
    }

}