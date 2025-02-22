import type { DBItem } from '.';

export interface IOrderData {
	id: string;
	quantity: number;
}

export interface IOrderRes extends DBItem {
	products: IOrderData[];
	totalPrice: number;
	email: string;
}
