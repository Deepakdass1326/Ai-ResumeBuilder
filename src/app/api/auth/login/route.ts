import {connectDB} from "@/lib/mongodb";
import { NextRequest , NextResponse } from "next/server";
import { ApiResponse } from "@/types/api.types";
import UserModel from "@/models/User.model";
import { generateToken } from "@/lib/jwt";
import { LoginBody } from "@/types/user.types";

export async function POST(req: NextRequest) {
        try {
    
            await connectDB();
    
            const body: LoginBody = await req.json();
    
            const { email, password } = body;
    
            if (!email || !password) {
                return NextResponse.json<ApiResponse>({
                    success: false,
                    message: "Please provide all the required fields"
                }, { status: 400 })
            }
    
            const isExisted = await UserModel.findOne({ email });
    
            if (!isExisted) {
                return NextResponse.json<ApiResponse>({
                    success: false,
                    message: "User not found with this email"
                }, { status: 404 })
            }
    
          const isPasswordMatched = isExisted.comparePassword(password);

            if (!isPasswordMatched) {
                return NextResponse.json<ApiResponse>({
                    success: false,
                    message: "Invalid password"
                }, { status: 401 })
            }

            const token = generateToken({ userId: isExisted._id.toString() })

            const response = NextResponse.json<ApiResponse>({
                success: true,
                message: "User logged in successfully",
                data: {
                    user: {
                        _id: isExisted._id,
                        name: isExisted.name,
                        email: isExisted.email,
                        mobile: isExisted.mobile
                    }
                }
            }, { status: 200 });
    
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
