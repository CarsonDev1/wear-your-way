export interface Account {
	_id: string;
	username: string;
	email: string;
	phone_number: string;
	avatar?: string;
	company?: string;
	address?: string
	role: string;
}
