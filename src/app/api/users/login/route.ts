import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import User from "@/model/userModel";
import connectToDatabase from "@/dbConfig/dbconfig";
import jwt from "jsonwebtoken";
connectToDatabase()
export async function POST(request: NextRequest) {
    try{
        console.log("Login attempt started");
        const reqBody= await request.json()
        const { email , password }= reqBody
        console.log("Login attempt for email:", email)
        
        // Validate input
        if (!email || !password) {
            return NextResponse.json({error:"Email and password are required"} , {status:400})
        }
 
 // Find user by email only (password is hashed in DB)
 const user = await User.findOne({ email });
    if(!user){
        return NextResponse.json({error:"User Not Found"} , {status:404})
    }
    
    // Compare the plain text password with the hashed password
    const validPassword = await bcrypt.compare(password, user.password)
    if(!validPassword){
        return NextResponse.json({error:"Invalid Password"} , {status:400})
    }
 const tokendata = {id:user._id, email:user.email, username : user.username}
const token = await jwt.sign(tokendata, process.env.TOKEN_SECRET!, {expiresIn:"1d"})
const res = NextResponse.json({message: "Login successful", token}, {status:200})
  res.cookies.set("token", token, {httpOnly:true, maxAge:24*60*60*1000}) // 24 hours in milliseconds
    return res;
}

    catch(err){
        console.error("Login error:", err);
        return NextResponse.json({error:"Internal Server Error"},{status:500})
    }
}

