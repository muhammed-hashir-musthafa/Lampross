import axiosInstance from "@/lib/axiosInstance";
import { AxiosResponse } from "axios";

interface CalculateEstimateResponse {
  success: boolean;
  message: string;
  estimate: {
    totalCost: number;
    breakdown: {
      materialCost: number;
      laborCost: number;
      otherCosts: number;
    };
  };
}

export const calculateEstimateApi = async (estimateData: {
  state: string;
  city: string;
  area: number;
  areaUnit: string;
  constructionType: string;
}): Promise<AxiosResponse<CalculateEstimateResponse>> => {
  const response = await axiosInstance.post<CalculateEstimateResponse>(
    "/estimation/calculate",
    estimateData
  );
  return response;
};
