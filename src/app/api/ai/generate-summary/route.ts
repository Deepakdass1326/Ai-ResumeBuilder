import { NextRequest, NextResponse } from "next/server";
import { ApiResponse } from "@/types/api.types";
import { GenerateSummary } from "@/types/ai.types";
import { GenerateAiContent } from "@/lib/Gemini";


export async function POST(req:NextRequest){

    try {

        const body: GenerateSummary = await req.json()
         
        const {experiance, skills , jobTitle} = body

        if(!experiance || !skills || !jobTitle) {
            return NextResponse.json<ApiResponse>({
                success: false,
                message: "All fields are required"
            }, {status: 400})
        }

        const prompt = `
You are an expert resume writer specializing in ATS (Applicant Tracking System) optimized resumes.

Generate a professional resume summary based on the candidate information below.

---
Candidate Information:
- Job Title / Target Role: ${jobTitle}
- Years of Experience: ${experiance}
- Key Skills: ${skills.join(", ")}
---

RULES (follow strictly):
1. Write ONLY the summary text — no labels, no headings, no explanation, no extra commentary.
2. Length: 3 to 5 sentences maximum. Keep it concise and impactful.
3. ATS Optimization:
   - Naturally include the job title ("${jobTitle}") in the first sentence.
   - Weave in relevant keywords from the skills list throughout the summary.
   - Avoid special characters, tables, or formatting — plain text only.
4. Tone: Professional, confident, and written in third-person (do NOT use "I", "my", or "me").
5. Structure the summary to follow this flow:
   a) Who the candidate is (role + experience level)
   b) Key strengths or area of expertise
   c) What value they bring to an employer
6. Do NOT use generic filler phrases like "hard-working", "team player", "go-getter", or "passionate".
7. Do NOT include salary, personal details, or anything unrelated to professional value.

Generate the summary now:
`
        
      const result = await GenerateAiContent(prompt)  

      const summary = result

      return NextResponse.json<ApiResponse>({
        success: true,
        data: {summary},
        message: "Summary generated successfully"
      }, {status: 200})

    } catch (error) {
        console.error("error in generate ai summary res ", error)

        return NextResponse.json<ApiResponse>({
            success: false,
            message: "Failed to generate summary"
        }, {status: 500})
    }
}