import axiosInstance from "@/lib/axiosInstance";
import { AxiosResponse } from "axios";

interface Category {
  _id: string;
  category: {
    name: string;
    slug: string;
    image: string;
  };
  title?: string; // Optional properties from TrendingProduct
  location?: string;
  price?: number;
  tags?: string[];
}

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
interface ProductResponse {
  success: boolean;
  count: number;
  products: Category[];
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
    return response.data;
  } catch (error) {
    console.error("Error adding product:", error);
    throw error;
  }
};

export const getProductsApi = async (queryParams: {
  type?: string;
  category?: string;
  city?: string;
  builtUpArea?: string;
  layout?: string;
  minPrice?: string;
  maxPrice?: string;
  sortBy?: string;
}): Promise<AxiosResponse<ProductResponse>> => {
  const response = await axiosInstance.get<ProductResponse>("/product", {
    params: queryParams,
  });
  return response;
};
