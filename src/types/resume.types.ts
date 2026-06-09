import { Types } from "mongoose";


export interface IpersonalInfo {
    name: string;
    email: string;
    phone: string;
    linkedin: string;
    github: string;
    portfolio: string;
    location: string;
}



export interface IworkExperience {
    company: string,
    position: string,
    startDate: string,
    endDate: string,
    description: string
}


export interface Iprojects {
    title: string,
    description: string,
    githubUrl: string,
    liveUrl: string,
    techStack: string[]
}


export interface Ieducation {
    institue: string,
    degree: string,
    startDate: string,
    endDate: string,

}

export interface IResume {
    _id?: string,
    user_id: Types.ObjectId,
    title: string,
    summary: string,
    personalInfo: IpersonalInfo,
    workExperience: IworkExperience[],
    projects: Iprojects[],
    education: Ieducation[],
    certificates?: string[],
    skills: string[]
    createdAt?: Date,
    updatedAt?: Date
}