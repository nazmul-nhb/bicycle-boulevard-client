import { AntNotifications } from '../App';
import type { IErrorResponse, IServerResponse } from '../types/server.types';
import { isFetchError } from '../utils/helpers';

/** Show Notifications/toasts based on API responses */
export const useNotifyResponse = () => {
	const { toastify, notify } = AntNotifications(true);

	/** - Handles successful API responses and shows notifications */
	const handleSuccess = <T extends IServerResponse<unknown>>(response: T) => {
		if (response?.success) {
			toastify.success(response.message || 'Operation successful!');
		}
	};

	/** - Handles API errors and shows notifications */
	const handleError = (error: unknown) => {
		let errorMessage = 'Something Went Wrong!';

		if (isFetchError(error)) {
			const errorData = error.data as IErrorResponse | undefined;
			errorMessage = errorData?.message || errorMessage;
			console.error('API Error:', error);
		} else if (error instanceof Error) {
			errorMessage = error.message;
			console.error('Client Error:', error);
		} else {
			console.error('Unknown Error:', error);
		}

		notify.error({ message: errorMessage });
	};

	return { handleSuccess, handleError };
};
