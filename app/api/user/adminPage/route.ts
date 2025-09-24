import { connect } from "@/app/dbConfig/dbConfig";
import { DataModel as Data } from "@/app/Models/dataModel";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
    try {
        // Extract token from cookies (same as your login route)
        const token = request.cookies.get("token")?.value || "";
        
        if (!token) {
            return NextResponse.json(
                { message: "Unauthorized - Please login first" },
                { status: 401 }
            );
        }

        // const TOKEN_SECRET = process.env.TOKEN_SECRET!;
        const TOKEN_SECRET = "abcedfghjklmnopqrstuvwxyzABCDEFGHJKLMNOPQRSTUVWXYZ1234567890";
        const decodedToken: any = jwt.verify(token, TOKEN_SECRET);
        const userId = decodedToken.id;

        // Parse request body
        const reqBody = await request.json();
        const { personOne, personTwo, imageOne, imageTwo, startTime, endTime } = reqBody;

        // Validation: Check if all required fields are present
        if (!personOne || !personTwo || !imageOne || !imageTwo || !startTime || !endTime) {
            return NextResponse.json(
                { message: "All fields are required" },
                { status: 400 }
            );
        }

        // Validation: Check if endTime is after startTime
        if (new Date(endTime) <= new Date(startTime)) {
            return NextResponse.json(
                { message: "End time must be after start time" },
                { status: 400 }
            );
        }

        // Create new data entry with user reference
        const newData = new Data({
            personOne,
            personTwo,
            imageOne,
            imageTwo,
            startTime: new Date(startTime),
            endTime: new Date(endTime),
            createdBy: userId // Store which user created this entry
        });

        // Save to database
        const savedData = await newData.save();

        return NextResponse.json({
            message: "Data saved successfully",
            success: true,
            data: savedData
        }, { status: 201 });

    } catch (error: any) {
        // Handle JWT errors (same error handling as your login route)
        if (error.name === "JsonWebTokenError") {
            return NextResponse.json(
                { message: "Invalid token" },
                { status: 401 }
            );
        }
        if (error.name === "TokenExpiredError") {
            return NextResponse.json(
                { message: "Token expired" },
                { status: 401 }
            );
        }
        
        // Handle MongoDB validation errors
        if (error.name === "ValidationError") {
            return NextResponse.json(
                { message: error.message },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { message: error.message },
            { status: 500 }
        );
    }
}
