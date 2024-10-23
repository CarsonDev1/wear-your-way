import api from '@/app/utils/api';

export const createProduct = async (productData: FormData) => {
	return await api.post('/products/create', productData, {
		headers: {
			'Content-Type': 'multipart/form-data',
		},
	});
};
