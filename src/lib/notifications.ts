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

type NotifyMethod = (args: ArgsProps) => void;

type ModalMethod = (props: ModalFuncProps) => ModalReturn;

type ModalReturn = ReturnType<ModalFunc> & {
	then<T>(resolve: (confirmed: boolean) => T, reject: VoidFunction): Promise<T>;
};

type SoundEffect =
	| 'success'
	| 'error'
	| 'info'
	| 'warning'
	// | 'loading'
	| 'confirm'
	| 'open';

/**
 * * Get the corresponding sound file path for a given sound effect.
 *
 * @param effect - The name of the sound effect.
 * @returns The file path of the sound effect.
 */
const getSoundFile = (effect: SoundEffect): string => {
	const basePath = '/sounds/';

	switch (effect) {
		case 'success':
			return basePath.concat('success.mp3');
		case 'error':
			return basePath.concat('error.mp3');
		case 'open':
		case 'info':
			return basePath.concat('info.mp3');
		case 'warning':
			return basePath.concat('warning.mp3');
		// case 'loading':
		// 	return basePath.concat('loading.mp3');
		case 'confirm':
			return basePath.concat('confirm.mp3');
		default:
			return basePath.concat('info.mp3');
	}
};

/**
 * * Wrapper for notification methods to add sound effects.
 *
 * @param method - The original notification method (e.g., `message.success`).
 * @param effect - The sound effect to play.
 * @param sound - Whether to play the sound or not.
 * @returns A wrapped function that plays the sound and then calls the original method.
 */
const wrapToast = (method: ToastMethod, effect: SoundEffect, sound?: boolean) => {
	return (
		content: JointContent,
		duration?: number | VoidFunction,
		onClose?: VoidFunction
	) => {
		if (sound) {
			playSound(getSoundFile(effect));
		}

		return method(content, duration, onClose);
	};
};

/**
 * * Wrapper for notification methods to add sound effects.
 *
 * @param method - The original notification method (e.g., `notification.success`).
 * @param effect - The sound effect to play.
 * @param sound - Whether to play the sound or not.
 * @returns A wrapped function that plays the sound and then calls the original method.
 */
const wrapNotify = (method: NotifyMethod, effect: SoundEffect, sound?: boolean) => {
	return (args: ArgsProps) => {
		if (sound) {
			playSound(getSoundFile(effect));
		}

		return method(args);
	};
};

/**
 * * Wrapper for modal methods to add sound effects.
 *
 * @param method - The original modal method (e.g., `modal.success`).
 * @param effect - The sound file to play.
 * @param sound - Whether to play the sound or not.
 * @returns A wrapped function that plays the sound and then calls the original method.
 */
const wrapModal = (method: ModalMethod, effect: SoundEffect, sound?: boolean) => {
	return (props: ModalFuncProps) => {
		if (sound) {
			playSound(getSoundFile(effect));
		}

		return method(props);
	};
};

/**
 * * Process `antd` notification methods with sound effects.
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
		success: wrapToast(props.message.success, 'success', sound),
		info: wrapToast(props.message.info, 'info', sound),
		// loading: wrapToast(props.message.loading, 'loading', sound),
		warning: wrapToast(props.message.warning, 'warning', sound),
		error: wrapToast(props.message.error, 'error', sound),
	};

	const notify = {
		...props.notification,
		success: wrapNotify(props.notification.success, 'success', sound),
		error: wrapNotify(props.notification.error, 'error', sound),
		info: wrapNotify(props.notification.info, 'info', sound),
		warning: wrapNotify(props.notification.warning, 'warning', sound),
		open: wrapNotify(props.notification.open, 'success', sound),
	};

	const modal = {
		...props.modal,
		success: wrapModal(props.modal.success, 'success', sound),
		error: wrapModal(props.modal.error, 'error', sound),
		info: wrapModal(props.modal.info, 'info', sound),
		warning: wrapModal(props.modal.warning, 'warning', sound),
		confirm: wrapModal(props.modal.confirm, 'confirm', sound),
	};

	return { toastify, notify, modal };
};
