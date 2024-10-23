import api from "@/app/utils/api";

export const updateAccount = async ({ id, accountDetails }: { id: string; accountDetails: FormData }) => {
  try {
    const response = await api.put(`/auth/users/${id}`, accountDetails, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    if (response.status === 204) {
      return;
    } else {
      return response.data;
    }
  } catch (error) {
    console.error('Error updating user:', error);
    throw new Error('Error updating user');
  }
};
