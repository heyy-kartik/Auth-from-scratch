import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import { decode } from "punycode";
export const getdata = (request: NextRequest) => {
 try {
    const token = request.cookies.get("token")?.value || '';
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET!);
    return decoded; 
 } catch (error:  any) {
    throw new  Error("Invalid Token")
 }
}