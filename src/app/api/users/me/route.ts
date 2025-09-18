import { Jwt } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import { getdata } from "@/helpers/getdata";
import User from "@/model/userModel";
import connectToDatabase from "@/dbConfig/dbconfig";

connectToDatabase() ; 

