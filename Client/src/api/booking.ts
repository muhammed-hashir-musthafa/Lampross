 import axiosInstance from "@/lib/axiosInstance";
import { AxiosResponse } from "axios";

export const createBookingApi = async (bookingData: {
  name: string;
  phone: string;
  email: string;
  place: string;
}): Promise<AxiosResponse<any>> => {
  const response = await axiosInstance.post("/booking/create", bookingData);
  return response;
};
