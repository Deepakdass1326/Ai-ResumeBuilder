import axios from "axios";



export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}


export const registerUser = async (
  payload: RegisterPayload
) => {
  const { data } = await axios.post(
    "/api/auth/register",
    payload,
    {
      withCredentials: true,
    }
  );

  return data;
};

export const loginUser = async (
  payload: LoginPayload
) => {
  const { data } = await axios.post(
    "/api/auth/login",
    payload,
    {
      withCredentials: true,
    }
  );

  return data;
};