/* eslint-disable @typescript-eslint/no-explicit-any */
import { Account } from '@/app/types/Account.type';
import api from '@/app/utils/api';

export const getAccount = async (): Promise<Account> => {
	try {
		const response = await api.get<Account>('auth/me');
		return response.data;
	} catch (error: any) {
		console.error('Error fetching account details:', error.response?.data || error.message);
		throw error;
	}
};
