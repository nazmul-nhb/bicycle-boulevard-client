import type { DBItem } from '.';
import type { ORDER_STATUS, PAYMENT_STATUS } from '../configs/constants';
import type { IProduct } from './product.types';

export interface IOrderData {
	product: string;
	quantity: number;
}

export interface IOrderRes extends DBItem {
	products: IOrderData[];
	totalPrice: number;
	email: string;
}

export interface IOrderDetails extends Omit<IOrderRes, 'products'> {
	products: { product: Omit<IProduct, 'createdBy'>; quantity: number }[];
	paymentStatus: (typeof PAYMENT_STATUS)[number];
	orderStatus: (typeof ORDER_STATUS)[number];
}
