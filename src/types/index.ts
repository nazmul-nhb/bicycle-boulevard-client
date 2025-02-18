import type { MessageInstance } from 'antd/es/message/interface';
import type { HookAPI } from 'antd/es/modal/useModal';
import type { NotificationInstance } from 'antd/es/notification/interface';
import type { QueryObject } from 'nhb-toolbox/dist/object/types';

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
}
