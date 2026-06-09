import { NextRequest, NextResponse } from "next/server";
import { ApiResponse } from "@/types/api.types";
import { ImproveContentBody } from "@/types/ai.types";
import { GenerateAiContent } from "@/lib/Gemini";


export async function POST(req: NextRequest) {

    try {

        const body: ImproveContentBody = await req.json()

        const { content } = body

        if (!content) {
            return NextResponse.json<ApiResponse>({
                success: false,
                message: "Content is required"
            }, { status: 400 })
        }

        const prompt = `
You are a professional resume expert and ATS (Applicant Tracking System) optimization specialist.

Your task is to improve the following resume content provided by the user.

---
Original Content:
"${content}"
---

RULES (follow strictly):
1. Return ONLY the improved content — no labels, no headings, no explanation, no "Here is the improved version:" intro.
2. Preserve the original format:
   - If the input is a paragraph → return an improved paragraph.
   - If the input is bullet points → return improved bullet points in the same style.
   - If the input is a single sentence → return a single improved sentence.
3. ATS Optimization:
   - Keep or enhance relevant industry keywords already present in the content.
   - Replace weak or vague words with strong, specific, ATS-recognized terminology.
   - Avoid special characters, emojis, or formatting that ATS systems cannot parse.
4. Language improvements:
   - Replace weak verbs (e.g., "helped", "worked on", "was responsible for") with strong action verbs (e.g., Engineered, Implemented, Delivered, Optimized, Automated).
   - Remove filler phrases like "various", "several", "many", "a lot of", "passionate about", "team player".
   - Make every word count — remove redundancy and wordiness.
5. Tone: Professional, confident, concise. Do NOT use first-person ("I", "my", "me").
6. Do NOT change the core meaning or fabricate new information. Only enhance what is already there.
7. If the content already contains metrics or numbers (e.g., "20% faster"), preserve and highlight them.
8. Keep the improved content roughly the same length as the original — do not add unnecessary sentences.

Improve the content now:
`

        const result = await GenerateAiContent(prompt)

        return NextResponse.json<ApiResponse>({
            success: true,
            data: { improvedContent: result?.trim() },
            message: "Content improved successfully"
        }, { status: 200 })

    } catch (error) {
        console.error("error in improve content route: ", error)

        return NextResponse.json<ApiResponse>({
            success: false,
            message: "Failed to improve content"
        }, { status: 500 })
    }
}