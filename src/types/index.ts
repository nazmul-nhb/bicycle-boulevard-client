import type { MessageInstance } from 'antd/es/message/interface';
import type { HookAPI } from 'antd/es/modal/useModal';
import type { NotificationInstance } from 'antd/es/notification/interface';
import type { QueryObject } from 'nhb-toolbox/dist/object/types';
import type { ICartProduct } from './product.types';

export type TNotifications = {
	/** Antd `message` as `toastify` */
	toastify: MessageInstance;
	/** Antd `notification` as `notify` */
	notify: NotificationInstance;
	/** Antd `modal` as `modal` */
	modal: HookAPI;
};

export interface DBItem {
	_id: string;
	createdAt: string;
	updatedAt: string;
}

export interface IQueryParams extends QueryObject {
	search?: string | number;
	sortBy?: string;
	sortOrder?: 'asc' | 'desc';
	filter?: string;
	page?: number;
	limit?: number;
	min?: number;
	max?: number;
	ids?: string[];
	select?: `${'+' | '-'}${string}`[];
}

export interface ICartItem {
	id: string;
	cartQuantity: number;
	date: string;
}

export interface ICartState {
	items: ICartItem[];
	total: number;
}

export type TSelectProducts = (product: ICartProduct, isSelected: boolean) => void;
export type TOnQuantityChange = (product: ICartProduct, quantity: number) => void;
