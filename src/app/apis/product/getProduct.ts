import { Product } from '@/app/types/Product.type';
import api from '@/app/utils/api';

export const getProducts = async (): Promise<Product[]> => {
	try {
		const response = await api.get<Product[]>('/products');
		return response.data;
	} catch (error: any) {
		console.error('Error fetching the products:', error.message);
		throw error;
	}
};
