import axiosInstance from "@/lib/axiosInstance";
import { AxiosResponse } from "axios";
export const calculateEstimateApi = async (estimateData: {
  state: string;
  city: string;
  area: number;
  areaUnit: string;
  constructionType: string;
}): Promise<AxiosResponse<any>> => {
  const response = await axiosInstance.post("/estimation/calculate", estimateData);
  return response;
};
