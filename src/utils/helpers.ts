import { jwtDecode } from 'jwt-decode';
import { configs } from '../configs/site_configs';
import type { IDecodedUser } from '../types/user.types';

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
	const uniqueValues = Array.from(new Set(data.map((item) => item[key])));
	return uniqueValues.map((value) => ({
		text: value,
		value,
	}));
};
