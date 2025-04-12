import type { PRODUCT_CATEGORIES } from '../configs/constants';
import type { DBItem, UploadPreview } from './index';

export interface ICreateProduct {
	name: string;
	description: string;
	brand: string;
	price: number;
	category: (typeof PRODUCT_CATEGORIES)[keyof typeof PRODUCT_CATEGORIES];
	quantity: number;
	inStock: number;
	image: File | UploadPreview[];
}

export interface IProduct
	extends Omit<ICreateProduct, 'description' | 'inStock' | 'image'>,
		DBItem {
	image: string;
	inStock: boolean;
	createdBy: string;
}

// export interface IProduct extends DBItem {}

export interface IProductDetails extends Omit<ICreateProduct, 'image' | 'inStock'>, DBItem {
	image: string;
	inStock: boolean;
	createdBy: string;
}

export interface IUpdateProduct extends Partial<Omit<ICreateProduct, 'inStock'>> {
	inStock?: boolean;
}

export interface IProductResponse {
	total: number;
	count: number;
	currentPage: number;
	totalPages: number;
	minPrice: number;
	maxPrice: number;
	products: IProduct[];
}

export interface ICartProduct
	extends Omit<IProduct, 'createdAt' | 'updatedAt' | 'createdBy'> {
	cartQuantity: number;
	cartDate: string;
}
