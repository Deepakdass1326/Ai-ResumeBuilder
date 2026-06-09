import mongoose from "mongoose"
import { IResume } from "@/types/resume.types"



const resumeSchema = new mongoose.Schema<IResume>({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },

    title: {
        type: String,
        default: ""
    },

    summary: {
        type: String,
        default: ""
    },

    personalInfo: {
        type: {
            name: String,
            email: String,
            phone: String,
            linkedin: String,
            github: String,
            portfolio: String,
            location: String
        },
        default: {}

    },

    workExperience: {
        type: [{
            company: String,
            position: String,
            startDate: String,
            endDate: String,
            description: String
        }],

        default: []
    },

    projects: {
        type: [{
            title: String,
            description: String,
            githubUrl: String,
            liveUrl: String,
            techStack: [String]
        }],
        default: []
    },

    skills: {
        type: [String],
        default: []
    },

    education: {
        type: [{
            institue: String,
            degree: String,
            startDate: String,
            endDate: String,
        }],
        default: []
    },

    certificates: {
        type: [String],
        default: []
    },


}, {
    timestamps: true
})


const ResumeModel = mongoose.model("Resume", resumeSchema)

export default ResumeModel