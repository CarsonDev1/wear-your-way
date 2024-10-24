import api from "@/app/utils/api"

export const initiateMomoPayment = async (orderId: string | undefined, amount: number | undefined) => {
  const response = await api.post('/orders/payment', {
    orderId,
    amount,
  });
  return response.data;
};