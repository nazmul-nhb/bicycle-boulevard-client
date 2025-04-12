import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { jwtDecode } from 'jwt-decode';
import type { CSSProperties } from 'react';
import { configs } from '../configs/site_configs';
import type { IDecodedUser } from '../types/user.types';
import type { UploadPreview } from '../types';

/**
 * Play a short sound effect.
 * - It is wise to put the sound file in `public` folder and use absolute path like `"/sounds/success.wav"`.
 * @param src Source of audio file as `string`.
 */
export const playSound = (src: string): void => {
	const audio = new Audio(src);
	audio.play();
};

/**
 * * Decode user from JWT token.
 * @param token JWT token to decode.
 * @returns Decoded user with role, email with JWT options.
 */
export const getDecodedUser = (token: string): IDecodedUser => {
	return jwtDecode(token) as IDecodedUser;
};

/**
 * * Get cloudinary image link from the filename.
 * @param src Image source, can be only the cloudinary public name for image like `"v1737848641/filename.jpg"`
 * @param baseUrl Base url for image link if it's not cloudinary image.
 * @returns Full image url.
 */
export const getImageLink = (src: string, baseUrl?: string): string => {
	if (baseUrl) return baseUrl.concat(src);
	return configs.image_base_url.concat(src);
};

/**
 * * Utility to check if a route path is dashboard or not based on `admin/customer`.
 * @param path Path to check if it's a dashboard or not
 * @returns Boolean.
 */
export const isDashboard = (path: string): boolean => {
	return path.startsWith('/admin') || path.startsWith('/customer');
};

/**
 * Generates unique filters from a given dataset.
 * @param data The dataset to extract unique filter values from.
 * @param key The key in the dataset to extract unique values.
 * @returns An array of filter objects for Ant Design Table.
 */
export const generateFilters = <T>(data: T[], key: keyof T) => {
	const uniqueValues = Array.from(new Set(data?.map((item) => item[key]))).filter(
		(val) => val !== null && val !== undefined
	);

	return uniqueValues?.map((value) => ({
		text: typeof value === 'boolean' ? (value === true ? 'Yes' : 'No') : String(value),
		value: value,
	}));
};

/**
 * * Prepare image for ant design upload preview.
 * @param src Image source, can be only the cloudinary public name for image like `"v1737848641/filename.jpg"`
 * @returns Prepared image for preview as an array of object.
 */
export const previewAntdImage = (src: string): UploadPreview[] => {
	return [
		{
			uid: '-1',
			name: 'Preview Image',
			status: 'done',
			url: getImageLink(src),
		},
	];
};

/**
 * * A generic debounce function that delays the execution of a callback.
 *
 * @template T - The type of the callback function.
 * @param callback - The function to debounce.
 * @param delay - The delay in milliseconds.
 * @returns A debounced version of the callback function.
 *
 * @example
 * const debouncedSearch = debounceAction((query: string) => {
 *   console.log(`Searching for: ${query}`);
 * }, 300);
 *
 * debouncedSearch('laptop'); // Executes after 300ms of inactivity.
 */
export const debounceAction = <T extends (...args: any[]) => void>(
	callback: T,
	delay: number
): ((...args: Parameters<T>) => void) => {
	let timeoutId: ReturnType<typeof setTimeout>;

	return (...args: Parameters<T>) => {
		// Clear the previous timeout
		clearTimeout(timeoutId);

		// Set a new timeout
		timeoutId = setTimeout(() => {
			callback(...args);
		}, delay);
	};
};

/** - Type Guard: Checks if error is a FetchBaseQueryError */
export const isFetchError = (error: unknown): error is FetchBaseQueryError => {
	return typeof error === 'object' && error !== null && 'data' in error;
};

/**
 * * Customize Antd Badge style
 * @param isGreen Whether the badge should be green or red.
 * @param top Top margin for the badge.
 * @returns Badge style object.
 */
export const getBadgeStyle = (isGreen = true, top = -2): CSSProperties => ({
	backgroundColor: 'rgba(0, 0, 0, 0)',
	fontSize: '0.9rem',
	fontWeight: 'bold',
	marginTop: top,
	color: isGreen ? 'green' : 'red',
	borderColor: 'rgba(0, 0, 0, 0)',
	paddingLeft: 2,
	paddingRight: 2,
});
