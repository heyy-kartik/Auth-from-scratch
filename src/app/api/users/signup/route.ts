import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import User from "@/model/userModel";

import connectToDatabase from "@/dbConfig/dbconfig";
connectToDatabase()

export async function POST(request: NextRequest) {
    try{
 const reqBody= await request.json()
 const {username, email , password }= reqBody
 console.log(reqBody)
 const user = await User.findOne({email:email, username:username , password:password})

 if(user){
    return NextResponse.json({error:"User Already Exists"},{status:400})
 }
const salt = await bcrypt.genSalt(12)
 const hashedPassword = await bcrypt.hash(password, salt)

 const newUser = new User ({username, email , password:hashedPassword})
 const savedUser = await newUser.save()
 console.log("User saved:", savedUser);
 return NextResponse.json({message: "User Registered Successfully"}, 
    
 )
    }
    catch(err){
        console.error("Signup error:", err);
        return NextResponse.json({error:"Internal Server Error"},{status:500})
    }
    }