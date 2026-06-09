import { getCurrentUser } from "@/lib/getCurrentUser";
import { connectDB } from "@/lib/mongodb";
import ResumeModel from "@/models/resume.model";
import { ApiResponse } from "@/types/api.types";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
    try {
        await connectDB()

        const userId = await getCurrentUser()

        const newResume = await ResumeModel.create({
            user_id: userId,
            title: "",
            summary: "",
            personalInfo: {},
            workExperience: [],
            projects: [],
            education: [],
            skills: [],
            certificates: []
        })
          
        return NextResponse.json<ApiResponse>({
            success: true,
            data: newResume,
            message: "Resume created successfully"
        }, {status: 201})

    } catch (error) {
        console.error("Error to connect to DB: ", error)
        return NextResponse.json<ApiResponse>({
            success: false,
            message: "Failed to create resume"
        }, {status: 500})
    }


}