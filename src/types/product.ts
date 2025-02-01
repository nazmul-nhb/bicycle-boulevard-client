import type { PRODUCT_CATEGORIES } from '../configs/constants';

export interface ICreateProduct {
	name: string;
	description: string;
	brand: string;
	price: number;
	category: (typeof PRODUCT_CATEGORIES)[keyof typeof PRODUCT_CATEGORIES];
	quantity: number;
	inStock: number;
	image: File;
}

export interface IProduct extends Omit<ICreateProduct, 'description' | 'image'> {
	_id: string;
	image: string;
	isDeleted: boolean;
	createdBy: string;
	createdAt: string;
	updatedAt: string;
}
