import { NextRequest, NextResponse } from "next/server";
import { ApiResponse } from "@/types/api.types";
import { GenerateSkills } from "@/types/ai.types";
import { GenerateAiContent } from "@/lib/Gemini";


export async function POST(req: NextRequest) {

    try {

        const body: GenerateSkills = await req.json()

        const { experiance, jobTitle } = body

        if (!experiance || !jobTitle) {
            return NextResponse.json<ApiResponse>({
                success: false,
                message: "All fields are required"
            }, { status: 400 })
        }

        const prompt = `
You are a professional technical resume consultant with deep knowledge of ATS (Applicant Tracking System) requirements.

Generate a list of TECHNICAL SKILLS for a resume based on the candidate information below.

---
Candidate Information:
- Job Title / Target Role: ${jobTitle}
- Years of Experience: ${experiance}
---

RULES (follow strictly):
1. Return ONLY a valid JSON array of skill strings — nothing else. No explanation, no markdown, no code block, no labels.
   Example of the exact format: ["React", "Node.js", "TypeScript", "MongoDB"]
2. Include ONLY hard technical skills. Examples of what to include:
   - Programming languages (e.g., JavaScript, Python, Java)
   - Frameworks & libraries (e.g., React, Express, Spring Boot)
   - Databases (e.g., PostgreSQL, MongoDB, Redis)
   - DevOps & cloud tools (e.g., Docker, AWS, CI/CD, GitHub Actions)
   - Developer tools & platforms (e.g., Git, Postman, VS Code, Linux)
3. Do NOT include soft skills under any circumstance (e.g., communication, leadership, problem-solving, teamwork).
4. Do NOT include vague or non-technical terms (e.g., "Microsoft Office", "Agile", "Scrum").
5. Skills must be ATS-optimized — use the exact industry-standard names recruiters and ATS systems search for.
6. Return between 10 and 20 skills — relevant, specific, and appropriate for the role and experience level.
7. Order the skills by relevance to the job title (most relevant first).

Generate the skills array now:
`

        const result = await GenerateAiContent(prompt)

        // AI returns a JSON string — strip markdown fences and parse into real array
        const cleanResult = result?.trim().replace(/```json|```/g, "").trim()
        const skills: string[] = JSON.parse(cleanResult ?? "[]")

        return NextResponse.json<ApiResponse>({
            success: true,
            data: skills,
            message: "Skills generated successfully"
        }, { status: 200 })

    } catch (error) {
        console.error("error in generate skills route: ", error)

        return NextResponse.json<ApiResponse>({
            success: false,
            message: "Failed to generate skills"
        }, { status: 500 })
    }
}