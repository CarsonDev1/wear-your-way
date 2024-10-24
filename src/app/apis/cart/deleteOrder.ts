import api from "@/app/utils/api";

export const deleteOrder = async (id: string) => {
  const response = await api.delete(`/orders/${id}`);
  return response.data;
};
