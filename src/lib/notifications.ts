import type { ModalFuncProps } from 'antd';
import type { useAppProps } from 'antd/es/app/context';
import type { JointContent, MessageType } from 'antd/es/message/interface';
import type { ModalFunc } from 'antd/es/modal/confirm';
import type { ArgsProps } from 'antd/es/notification/interface';
import type { TNotifications } from '../types';
import { playSound } from '../utils/helpers';

type ToastMethod = (
	content: JointContent,
	duration?: number | VoidFunction,
	onClose?: VoidFunction
) => MessageType;

/**
 * Wrapper for notification methods to add sound effects.
 *
 * @param method - The original notification method (e.g., `message.success`).
 * @param src - The sound file to play.
 * @param sound - Whether to play the sound or not.
 * @returns A wrapped function that plays the sound and then calls the original method.
 */
const wrapToast = (method: ToastMethod, src: string, sound?: boolean) => {
	return (
		content: JointContent,
		duration?: number | VoidFunction,
		onClose?: VoidFunction
	) => {
		if (sound) {
			playSound(src);
		}

		return method(content, duration, onClose);
	};
};

type NotifyMethod = (args: ArgsProps) => void;

/**
 * Wrapper for notification methods to add sound effects.
 *
 * @param method - The original notification method (e.g., `notification.success`).
 * @param src - The sound file to play.
 * @param sound - Whether to play the sound or not.
 * @returns A wrapped function that plays the sound and then calls the original method.
 */
const wrapNotify = (method: NotifyMethod, src: string, sound?: boolean) => {
	return (args: ArgsProps) => {
		if (sound) {
			playSound(src);
		}

		return method(args);
	};
};

type ModalReturn = ReturnType<ModalFunc> & {
	then<T>(
		resolve: (confirmed: boolean) => T,
		reject: VoidFunction
	): Promise<T>;
};

type ModalMethod = (props: ModalFuncProps) => ModalReturn;

/**
 * Wrapper for modal methods to add sound effects.
 *
 * @param method - The original modal method (e.g., `modal.success`).
 * @param src - The sound file to play.
 * @param sound - Whether to play the sound or not.
 * @returns A wrapped function that plays the sound and then calls the original method.
 */
const wrapModal = (method: ModalMethod, src: string, sound?: boolean) => {
	return (props: ModalFuncProps) => {
		if (sound) {
			playSound(src);
		}

		return method(props);
	};
};

/**
 * Process `antd` notification methods with sound effects.
 *
 * @param props - Props from `App.useApp()` of `antd`.
 * @param sound - Whether to play sound effects or not.
 * @returns The wrapped notification methods (`toast`, `notify`, `showModal`).
 */
export const processNotifications = (
	props: useAppProps,
	sound?: boolean
): TNotifications => {
	const toastify = {
		...props.message,
		success: wrapToast(props.message.success, '/sounds/success.mp3', sound),
		info: wrapToast(props.message.info, '/sounds/info.mp3', sound),
		loading: wrapToast(props.message.loading, '/sounds/loading.mp3', sound),
		warning: wrapToast(props.message.warning, '/sounds/warning.mp3', sound),
		error: wrapToast(props.message.error, '/sounds/error.mp3', sound),
	};

	const notify = {
		...props.notification,
		success: wrapNotify(
			props.notification.success,
			'/sounds/success.mp3',
			sound
		),
		error: wrapNotify(props.notification.error, '/sounds/error.mp3', sound),
		info: wrapNotify(props.notification.info, '/sounds/info.mp3', sound),
		warning: wrapNotify(
			props.notification.warning,
			'/sounds/warning.mp3',
			sound
		),
		open: wrapNotify(props.notification.open, '/sounds/success.mp3', sound),
	};

	const modal = {
		...props.modal,
		success: wrapModal(props.modal.success, '/sounds/success.mp3', sound),
		error: wrapModal(props.modal.error, '/sounds/error.mp3', sound),
		info: wrapModal(props.modal.info, '/sounds/info.mp3', sound),
		warning: wrapModal(props.modal.warning, '/sounds/warning.mp3', sound),
		confirm: wrapModal(props.modal.confirm, '/sounds/confirm.mp3', sound),
	};

	return { toastify, notify, modal };
};
