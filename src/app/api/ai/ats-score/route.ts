import { NextRequest, NextResponse } from "next/server";
import { ApiResponse } from "@/types/api.types";
import { AtsScoreBody } from "@/types/ai.types";
import { GenerateAiContent } from "@/lib/Gemini";


export async function POST(req: NextRequest) {

    try {

        const body: AtsScoreBody = await req.json()

        const { resumeText } = body

        if (!resumeText) {
            return NextResponse.json<ApiResponse>({
                success: false,
                message: "Resume text is required"
            }, { status: 400 })
        }

        const prompt = `
You are a professional ATS (Applicant Tracking System) analyst and resume scoring expert.

Analyze the following resume text and provide a detailed ATS compatibility score and feedback.

---
Resume Text:
"${resumeText}"
---

RULES (follow strictly):
1. Return ONLY a valid JSON object — no explanation, no markdown, no code block, no extra text.
2. The JSON must exactly match this structure:

{
  "overallScore": <number between 0 and 100>,
  "breakdown": {
    "keywordsScore": <number between 0 and 100>,
    "formattingScore": <number between 0 and 100>,
    "actionVerbsScore": <number between 0 and 100>,
    "quantifiableImpactScore": <number between 0 and 100>,
    "readabilityScore": <number between 0 and 100>
  },
  "strengths": [<2 to 4 short strings describing what is done well>],
  "improvements": [<3 to 5 short strings describing specific things to improve>],
  "missingKeywords": [<list of important industry keywords that appear to be missing or underused>],
  "verdict": <one of: "Excellent", "Good", "Needs Improvement", "Poor">
}

3. Scoring criteria for each breakdown category:
   - keywordsScore: Presence of relevant industry-standard technical and role-specific keywords.
   - formattingScore: Clean plain-text structure, no special characters or tables that confuse ATS parsers.
   - actionVerbsScore: Use of strong past-tense action verbs (Developed, Implemented, Engineered, etc.) instead of weak verbs (helped, worked on, was responsible for).
   - quantifiableImpactScore: Presence of measurable achievements and numbers (e.g., "reduced load time by 40%", "served 10,000+ users").
   - readabilityScore: Clear, concise language; no filler phrases; logical structure.
4. overallScore must be a weighted average: keywords (30%) + formatting (20%) + actionVerbs (20%) + quantifiableImpact (15%) + readability (15%).
5. missingKeywords: Suggest 3 to 6 realistic keywords that are typically expected for the apparent job role but are missing from the resume.
6. All string values must be plain text — no markdown, no bullet symbols inside the JSON strings.

Analyze and return the JSON now:
`

        const result = await GenerateAiContent(prompt)

        // Strip markdown fences if AI wraps in code block
        const cleanResult = result?.trim().replace(/```json|```/g, "").trim()
        const atsReport = JSON.parse(cleanResult ?? "{}")

        return NextResponse.json<ApiResponse>({
            success: true,
            data: atsReport,
            message: "ATS score generated successfully"
        }, { status: 200 })

    } catch (error) {
        console.error("error in ats score route: ", error)

        return NextResponse.json<ApiResponse>({
            success: false,
            message: "Failed to generate ATS score"
        }, { status: 500 })
    }
}