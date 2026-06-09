import { NextRequest, NextResponse } from "next/server";
import { ApiResponse } from "@/types/api.types";
import { GenerateProjectDescription } from "@/types/ai.types";
import { GenerateAiContent } from "@/lib/Gemini";


export async function POST(req: NextRequest) {

    try {

        const body: GenerateProjectDescription = await req.json()

        const { projectName, techStack, projectType } = body

        if (!projectName || !techStack || !projectType) {
            return NextResponse.json<ApiResponse>({
                success: false,
                message: "All fields are required"
            }, { status: 400 })
        }

        const prompt = `
You are an expert resume writer specializing in ATS (Applicant Tracking System) optimized resumes.

Generate a professional project description for a resume based on the project details below.

---
Project Information:
- Project Name: ${projectName}
- Project Type: ${projectType}
- Tech Stack Used: ${techStack.join(", ")}
---

RULES (follow strictly):
1. Return ONLY the description text — no labels, no headings, no intro, no explanation.
2. Length: 2 to 4 bullet points. Each bullet must be a single, concise sentence.
3. Format: Start each bullet point with a strong action verb (e.g., Built, Developed, Implemented, Designed, Integrated, Optimized, Deployed).
4. ATS Optimization:
   - Naturally mention the tech stack keywords (${techStack.join(", ")}) within the bullet points.
   - Use industry-standard terminology that ATS systems and recruiters search for.
   - Avoid vague language — be specific about what was built and what it does.
5. Focus on:
   a) What the project does (its purpose or problem it solves)
   b) How it was built (key technical decisions, tech used)
   c) Impact or outcome where possible (e.g., "reducing load time by 40%", "supporting 1000+ users")
6. Do NOT use first-person ("I built", "My project"). Write in past tense, impersonal style.
7. Do NOT include generic phrases like "user-friendly", "scalable solution", or "cutting-edge".
8. Each bullet should stand alone and add unique value — no repetition.

Generate the project description bullet points now:
`

        const result = await GenerateAiContent(prompt)

        return NextResponse.json<ApiResponse>({
            success: true,
            data: { description: result?.trim() },
            message: "Project description generated successfully"
        }, { status: 200 })

    } catch (error) {
        console.error("error in generate project description route: ", error)

        return NextResponse.json<ApiResponse>({
            success: false,
            message: "Failed to generate project description"
        }, { status: 500 })
    }
}