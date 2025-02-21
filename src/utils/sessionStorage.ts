/**
 * * Get item(s) from session storage.
 *
 * @param key - Key to get item(s) from session storage.
 * @returns Returns saved item(s) from session storage if it exists with that key.
 */
export const getFromSessionStorage = <T>(key: string): T | null => {
	const item = sessionStorage.getItem(key);

	if (!item) return null;

	return JSON.parse(item) as T;
};

/**
 * * Save item(s) in session storage.
 *
 * @param key - Key to save an item(s).
 * @param value - The item(s)/value to save.
 */
export const saveToSessionStorage = <T>(key: string, value: T): void => {
	sessionStorage.setItem(key, JSON.stringify(value));
};

/**
 * * Remove item(s) from session storage.
 *
 * @param key - Key to delete item(s) from session storage.
 */
export const removeFromSessionStorage = (key: string): void => {
	sessionStorage.removeItem(key);
};
