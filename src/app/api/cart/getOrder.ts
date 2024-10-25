/* eslint-disable @typescript-eslint/no-explicit-any */
import { Order } from '@/app/types/Order.type';
import api from '@/app/utils/api';

export const getOrders = async (): Promise<Order[]> => {
  try {
    const response = await api.get<Order[]>('/orders');
    return response.data;
  } catch (error: any) {
    console.error('Error fetching the orders:', error.message);
    throw error;
  }
};
