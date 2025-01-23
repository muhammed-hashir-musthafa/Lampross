import axiosInstance from "@/lib/axiosInstance";

interface AddProductResponse {
  success: boolean;
  message: string;
  product: {
    id: string;
    name: string;
    price: number;
    description: string;
    category: string;
    images: string[];
    createdAt: string;
  };
}

export const addProductApi = async (
  productData: FormData
): Promise<AddProductResponse> => {
  try {
    const response = await axiosInstance.post<AddProductResponse>(
      `/product`,
      productData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error adding product:", error);
    throw error;
  }
};
