/* eslint-disable @typescript-eslint/no-explicit-any */
import { Product } from '@/app/types/Product.type';
import api from '@/app/utils/api';

export const getProductById = async (id: string): Promise<Product> => {
  try {
    const response = await api.get(`/products/${id}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.error || 'Error fetching product by ID');
  }
};
