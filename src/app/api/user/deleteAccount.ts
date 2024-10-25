import api from "@/app/utils/api";

export const deleteAccount = async (id: string) => {
  const response = await api.delete(`/auth/users/${id}`);
  return response.data;
};