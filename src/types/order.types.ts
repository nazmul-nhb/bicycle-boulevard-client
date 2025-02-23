import type { DBItem } from '.';

export interface IOrderData {
	product: string;
	quantity: number;
}

export interface IOrderRes extends DBItem {
	products: IOrderData[];
	totalPrice: number;
	email: string;
}
