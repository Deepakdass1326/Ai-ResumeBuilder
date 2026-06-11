import axios from "axios";
import {
  GenerateSummary,
  GenerateSkills,
  GenerateProjectDescription,
  GenerateExperianceDescription,
  ImproveContentBody,
  AtsScoreBody,
} from "@/types/ai.types";
import { ApiResponse } from "@/types/api.types";

const aiClient = axios.create({
  baseURL: "/api/ai",
  withCredentials: true,
});

export const generateSummary = async (payload: GenerateSummary): Promise<string> => {
  const { data } = await aiClient.post<ApiResponse>("/generate-summary", payload);
  return (data.data as any).summary || "";
};

export const generateSkills = async (payload: GenerateSkills): Promise<string[]> => {
  const { data } = await aiClient.post<ApiResponse>("/generate-skills", payload);
  // Depending on what the AI route returns, it might be an array or string. Assume it's in data.skills.
  // The Gemini prompt often returns stringified JSON or plain text depending on how it's written.
  // Assuming the backend handles the parsing and returns an array.
  return (data.data as any).skills || [];
};

export const generateProjectDescription = async (
  payload: GenerateProjectDescription
): Promise<string> => {
  const { data } = await aiClient.post<ApiResponse>("/generate-project-description", payload);
  return (data.data as any).description || "";
};

export const generateExperienceDescription = async (
  payload: GenerateExperianceDescription
): Promise<string> => {
  const { data } = await aiClient.post<ApiResponse>("/generate-experiance-description", payload);
  return (data.data as any).description || "";
};

export const improveContent = async (payload: ImproveContentBody): Promise<string> => {
  const { data } = await aiClient.post<ApiResponse>("/improve-content", payload);
  return (data.data as any).content || "";
};

export const getAtsScore = async (payload: AtsScoreBody): Promise<number> => {
  const { data } = await aiClient.post<ApiResponse>("/ats-score", payload);
  return (data.data as any).overallScore || 0;
};
