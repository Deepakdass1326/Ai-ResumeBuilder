import axios from "axios";
import { IResume } from "@/types/resume.types";

export interface CreateResumeResponse {
  success: boolean;
  message?: string;
  data?: {
    _id: string;
  };
}

export const createResume = async (): Promise<CreateResumeResponse> => {
  const { data } = await axios.post<CreateResumeResponse>(
    "/api/resume/create",
    {},
    {
      withCredentials: true,
    }
  );

  return data;
};

export const getResumeById = async (
  resumeId: string
): Promise<IResume> => {
  const { data } = await axios.get<{success: boolean, data: IResume, message: string}>(
    `/api/resume/${resumeId}`,
    {
      withCredentials: true,
    }
  );

  return data.data;
};

export const updateResume = async (
  resumeId: string,
  payload: Partial<IResume>
) => {
  const { data } = await axios.patch(
    `/api/resume/${resumeId}`,
    payload,
    {
      withCredentials: true,
    }
  );

  return data;
};