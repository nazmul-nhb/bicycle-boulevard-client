export interface ICreateProduct {
	name: string;
	description: string;
	brand: string;
	price: number;
	category: string;
	quantity: number;
	inStock: number;
	image: File;
}