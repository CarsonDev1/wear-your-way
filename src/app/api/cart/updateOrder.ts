import api from '@/app/utils/api';

export const updateOrderStatus = async (orderData: { id: string; status: string }) => {
  const response = await api.patch(`/orders/${orderData.id}/status`, { status: orderData.status });
  return response.data;
};
