import { connectDB } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { RegisterBody } from "@/types/user.types";
import { ApiResponse } from "@/types/api.types";
import UserModel from "@/models/User.model";
import { generateToken } from "@/lib/jwt";


export async function POST(req: NextRequest) {
    try {

        await connectDB();

        const body: RegisterBody = await req.json();

        const { name, email, password, mobile } = body;

        if (!name || !email || !password) {
            return NextResponse.json<ApiResponse>({
                success: false,
                message: "Please provide all the required fields"
            }, { status: 400 })
        }

        const isExisted = await UserModel.findOne({ email });

        if (isExisted) {
            return NextResponse.json<ApiResponse>({
                success: false,
                message: "User already exists with this email"
            }, { status: 409 })
        }

        const newUser = await UserModel.create({
            name,
            email,
            password,
            mobile
        })

        const token = generateToken({ userId: newUser._id.toString() })

        const response = NextResponse.json<ApiResponse>({
            success: true,
            message: "User registered successfully",
            data: {
                user: {
                    _id: newUser._id,
                    name: newUser.name,
                    email: newUser.email,
                    mobile: newUser.mobile
                }
            }
        }, { status: 201 });

        response.cookies.set("token", token, {
            httpOnly: true,
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 // 7 days
        })

        return response;

    }
    catch (error) {
        console.log("error in register route", error);
        return NextResponse.json<ApiResponse>({
            success: false,
            message: "Internal server error" 
        }, { status: 500 });
    }
}