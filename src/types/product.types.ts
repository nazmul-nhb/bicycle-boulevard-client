import type { DBItem } from '.';
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
	image: string;
	isDeleted: boolean;
	createdBy: string;
}

export interface IProduct extends DBItem {}

export interface IProductDetails extends IProduct {
	description: string;
}
