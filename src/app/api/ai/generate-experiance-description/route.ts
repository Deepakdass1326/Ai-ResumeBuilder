import { NextRequest, NextResponse } from "next/server";
import { ApiResponse } from "@/types/api.types";
import { GenerateExperianceDescription } from "@/types/ai.types";
import { GenerateAiContent } from "@/lib/Gemini";


export async function POST(req: NextRequest) {

    try {

        const body: GenerateExperianceDescription = await req.json()

        const { jobTitle, experiance, techStack } = body

        if (!jobTitle || !experiance || !techStack) {
            return NextResponse.json<ApiResponse>({
                success: false,
                message: "All fields are required"
            }, { status: 400 })
        }

        const prompt = `
You are an expert resume writer specializing in ATS (Applicant Tracking System) optimized resumes.

Generate a professional work experience description for a resume based on the candidate's job details below.

---
Work Experience Information:
- Job Title / Role: ${jobTitle}
- Years of Experience: ${experiance} ${experiance === 1 ? "year" : "years"}
- Technologies & Tools Used: ${techStack.join(", ")}
---

RULES (follow strictly):
1. Return ONLY the bullet points — no labels, no headings, no intro sentence, no explanation.
2. Length: 3 to 5 bullet points. Each bullet must be a single, concise and impactful sentence.
3. Format: Start each bullet point with a strong past-tense action verb.
   Use power verbs such as: Developed, Engineered, Architected, Optimized, Automated, Delivered, Collaborated, Migrated, Reduced, Increased, Implemented, Integrated, Designed, Streamlined, Maintained.
4. ATS Optimization:
   - Naturally embed the tech stack keywords (${techStack.join(", ")}) across the bullet points.
   - Use exact industry-standard names for tools and technologies.
   - Avoid vague descriptions — be specific about what was done and what was used.
5. Structure the bullets to cover:
   a) Core technical responsibilities (what they built or maintained)
   b) Cross-team or cross-functional collaboration if applicable
   c) Measurable impact or outcome (e.g., "improving performance by 30%", "reducing deployment time by 50%", "serving 10,000+ users")
6. Do NOT use first-person ("I developed", "My responsibility"). Write in third-person impersonal past tense.
7. Do NOT use filler phrases like "responsible for", "worked on", "helped with", "assisted in", or "was involved in".
8. Do NOT repeat the same action verb across multiple bullets.
9. Each bullet must add unique value and describe a distinct contribution.

Generate the work experience bullet points now:
`

        const result = await GenerateAiContent(prompt)

        return NextResponse.json<ApiResponse>({
            success: true,
            data: { description: result?.trim() },
            message: "Experience description generated successfully"
        }, { status: 200 })

    } catch (error) {
        console.error("error in generate experience description route: ", error)

        return NextResponse.json<ApiResponse>({
            success: false,
            message: "Failed to generate experience description"
        }, { status: 500 })
    }
}