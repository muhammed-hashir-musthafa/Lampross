import axiosInstance from "@/lib/axiosInstance";
import { AxiosResponse } from "axios";

interface LoginResponse {
  success: boolean;
  message: string;
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

interface UserSignUpResponse {
  success: boolean;
  message: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
    phoneNumber: string;
    place: string;
    age: number;
    gender: string;
  };
}

export const userSignUpApi = async (userData: {
  name: string;
  role: string;
  phoneNumber: string;
  email: string;
  place: string;
  age: number;
  gender: string;
}): Promise<AxiosResponse<UserSignUpResponse>> => {
  const response = await axiosInstance.post<UserSignUpResponse>(
    "/auth/register",
    userData
  );
  return response;
};

export const userLoginApi = async (credentials: {
  phoneNumber: string;
  otp: string;
}): Promise<LoginResponse> => {
  const response = await axiosInstance.post("/auth/login", credentials);
  return response.data;
};

export const userLogoutApi = async (): Promise<LoginResponse> => {
  const response = await axiosInstance.post("/auth/logout");
  return response.data;
};
// export const verifyOtpApi = async (
//   otp: string
// ): Promise<AxiosResponse<any>> => {
//   const response = await axiosInstance.post("/verify-otp", { otp });
//   return response.data;
// };
