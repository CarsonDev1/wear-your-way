import api from '@/app/utils/api';

export const initiateVnpayPayment = async (orderId: string | undefined, amount: number | undefined) => {
	const response = await api.post('/orders/payment/vnpay', {
		orderId,
		amount,
		orderInfo: `Thanh toan don hang ${orderId}`,
		bankCode: 'VNBANK',
	});
	return response.data;
};
