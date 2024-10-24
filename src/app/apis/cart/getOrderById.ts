/* eslint-disable @typescript-eslint/no-explicit-any */
import { Order } from '@/app/types/Order.type';
import api from '@/app/utils/api';

export const getOrderById = async (id: string): Promise<Order> => {
  try {
    const response = await api.get(`/orders/${id}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.error || 'Error fetching order by ID');
  }
};
