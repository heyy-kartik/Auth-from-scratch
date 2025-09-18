import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

export const getdata = (request: NextRequest) => {
    try {
        const token = request.cookies.get("token")?.value || '';
        
        if (!token) {
           console.error("No token provided");
        }
        
        const decoded: any = jwt.verify(token, process.env.TOKEN_SECRET!);
        
        // Return the user ID from the decoded token
        return decoded.id;
    } catch (error: any) {
        console.log("Invalid Token");
    }
}