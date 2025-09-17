import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import User from "@/model/userModel";
import connectToDatabase from "@/dbConfig/dbconfig";
import jwt from "jsonwebtoken";
connectToDatabase()
export async function POST(request: NextRequest) {
    try{
 const reqBody= await request.json()
 const { email , password }= reqBody
 console.log(reqBody)
 const user = await User.findOne({ email , password });
    if(!user){
        return NextResponse.json({error:"User Not Found"} , {status:404})
    }
    const validPassword = await bcrypt.compare(password, user.password)
    if(!validPassword){
        return NextResponse.json({error:"Invalid Password"} , {status:400})

    }
 const tokendata = {id:user._id, email:user.email, username : user.username}
const token = await jwt.sign(tokendata, process.env.TOKEN_SECRET!, {expiresIn:"1d"})
const res = NextResponse.json({token}, {status:200})
  res.cookies.set("token", token, {httpOnly:true, maxAge:24*60*60})
    return res;
}

    catch(err){
        console.error("Login error:", err);
        return NextResponse.json({error:"Internal Server Error"},{status:500})
    }
}