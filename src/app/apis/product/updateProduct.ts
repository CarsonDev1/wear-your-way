import api from "@/app/utils/api";

export const updateProduct = async ({ id, productDetails }: { id: string; productDetails: FormData }) => {
  try {
    const response = await api.put(`/products/${id}`, productDetails, {
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
    console.error('Error updating product:', error);
    throw new Error('Error updating product');
  }
};