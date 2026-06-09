import { NextRequest, NextResponse } from "next/server";
import { ApiResponse } from "@/types/api.types";
import { connectDB } from "@/lib/mongodb";
import { getCurrentUser } from "@/lib/getCurrentUser";
import ResumeModel from "@/models/resume.model";

export async function GET(res:NextResponse, {params}: {params: Promise<{resumeid: string}>}) {

    try {
      
      await connectDB()

      const user = await getCurrentUser()

      const {resumeid} = await params

      const resume = await ResumeModel.findOne({
        user_id: user ,     
        _id: resumeid
      })

      if(!resume) {
        return NextResponse.json<ApiResponse>({
          success: false,
          message: "Resume not found"
        }, {status: 404})
      }

      return NextResponse.json<ApiResponse>({
        success: true,
        data: resume,
        message: "Resume fetched successfully"
      }, {status: 200})

      
        
        
    } catch (error) {
        console.log("error in get resume api: ", error)

        return NextResponse.json<ApiResponse>({
            success: false,
            message: "Failed to get resume"
        }, {status: 500})
    }


}

export async function PATCH(res:NextResponse, {params}: {params: Promise<{resumeid: string}>}) {

    try {
      
      await connectDB()

      const user = await getCurrentUser()

      const body = await res.json()

      const {resumeid} = await params

     const updatedResume = await ResumeModel.findOneAndUpdate({
        _id: resumeid,
        user_id: user
     },
     {
        $set:body
     },
     {
        new:true,
        runValidators:true
     }
    )

      if(!updatedResume) {
        return NextResponse.json<ApiResponse>({
          success: false,
          message: "Updated Resume faild to update"
        }, {status: 400})
      }

      return NextResponse.json<ApiResponse>({
        success: true,
        data: updatedResume,
        message: "Resume updated successfully"
      }, {status: 200})

      
        
        
    } catch (error) {
        console.log("error in get resume api: ", error)

        return NextResponse.json<ApiResponse>({
            success: false,
            message: "Failed to get resume"
        }, {status: 500})
    }


}

