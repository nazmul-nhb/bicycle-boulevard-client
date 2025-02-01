import type { HookAPI } from 'antd/es/modal/useModal';
import type { MessageInstance } from 'antd/es/message/interface';
import type { NotificationInstance } from 'antd/es/notification/interface';

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
	[key: string]: unknown;
}
