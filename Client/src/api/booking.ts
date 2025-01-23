import axiosInstance from "@/lib/axiosInstance";
import { AxiosResponse } from "axios";

interface CreateBookingResponse {
  success: boolean;
  message: string;
  booking: {
    id: string;
    name: string;
    phone: string;
    email: string;
    place: string;
    createdAt: string;
  };
}

export const createBookingApi = async (bookingData: {
  name: string;
  phone: string;
  email: string;
  place: string;
}): Promise<AxiosResponse<CreateBookingResponse>> => {
  const response = await axiosInstance.post<CreateBookingResponse>(
    "/booking/create",
    bookingData
  );
  return response;
};
