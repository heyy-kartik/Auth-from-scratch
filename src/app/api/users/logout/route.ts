import { NextResponse, NextRequest } from "next/server";

export async function GET() {
    try {
        console.log("Logout attempt started");
        
        // Create response with success message
        const res = NextResponse.json({ message: "Logout successful" }, { status: 200 });
        
        // Clear the token cookie
        res.cookies.set("token", "", {
            httpOnly: true,
            expires: new Date(0) // Set expiry to past date to clear cookie
        });
        
        return res;
    } catch (error: any) {
        console.log("Logout error:", error);
        return NextResponse.json({ error: "Logout failed" }, { status: 500 });
    }
}

export async function POST() {
    try {
        console.log("Logout attempt started (POST)");
        
        // Create response with success message
        const res = NextResponse.json({ message: "Logout successful" }, { status: 200 });
        
        // Clear the token cookie
        res.cookies.set("token", "", {
            httpOnly: true,
            expires: new Date(0) // Set expiry to past date to clear cookie
        });
        
        return res;
    } catch (error: any) {
        console.log("Logout error:", error);
        return NextResponse.json({ error: "Logout failed" }, { status: 500 });
    }
}
