

export interface GenerateSummary{
    experiance: string,
    skills: string[],
    jobTitle: string,
}


export interface GenerateSkills{
    experiance: string,
    jobTitle: string
}


export interface GenerateProjectDescription{
    projectName: string,
    techStack: string[],
    projectType: string,  // e.g. "web app", "mobile app", "API", "CLI tool"
}

export interface GenerateExperianceDescription {
    jobTitle: string,
    experiance: number,
    techStack: string[],
}


