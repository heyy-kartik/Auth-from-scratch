import { NextRequest, NextResponse } from "next/server";
import { getdata } from "@/helpers/getdata";
import User from "@/model/userModel";
import connectToDatabase from "@/dbConfig/dbconfig";

connectToDatabase(); 

export async function GET(request: NextRequest) {
    try {
        console.log("Getting user profile...");
        
        const userId = await getdata(request);
        console.log("User ID from token:", userId);
        
        if (!userId) {
            return NextResponse.json({
                error: "User ID not found in token"
            }, { status: 401 });
        }
        
        const user = await User.findOne({
            _id: userId 
        }).select("-password"); 

        if (!user) {
            return NextResponse.json({
                error: "User not found"
            }, { status: 404 });
        }

        console.log("User profile retrieved successfully");
        return NextResponse.json({
            message: "User Found", 
            data: user
        });
    } catch (error: any) {
        console.error("Get user profile error:", error);
        return NextResponse.json({
            error: error.message   
        }, { status: 400 });
    }
}
