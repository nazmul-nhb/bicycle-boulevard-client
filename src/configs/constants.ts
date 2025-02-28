export const USER_ROLES = {
	ADMIN: 'admin',
	CUSTOMER: 'customer',
} as const;

export const PRODUCT_CATEGORIES = {
	MOUNTAIN: 'Mountain',
	ROAD: 'Road',
	HYBRID: 'Hybrid',
	BMX: 'BMX',
	ELECTRIC: 'Electric',
} as const;

export const categoryOptions = Object.entries(PRODUCT_CATEGORIES).map(([_key, value]) => ({
	value: value,
	label: value,
}));

export const PAYMENT_STATUS = ['pending', 'paid', 'failed', 'cancelled'] as const;

export const ORDER_STATUS = [
	'confirmed',
	'pending',
	'processing',
	'cancelled',
	'delivered',
] as const;
