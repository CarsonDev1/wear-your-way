export interface Product {
	_id: string;
	name: string;
	price: number;
	sold: number;
	reviewsCount: number;
	rating: number;
	imageUrls: string[];
	size: number[];
}
