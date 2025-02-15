import { generateQueryParams } from 'nhb-toolbox';
import type { QueryObject } from 'nhb-toolbox/dist/object/types';
import { useCallback } from 'react';
import { useSearchParams } from 'react-router';

const useQueryParams = () => {
	const [searchParams, setSearchParams] = useSearchParams();

	/**
	 * * Get a query parameter value.
	 * @param key Key of the query param to get the value from.
	 * @returns Value of the query param for the specified key.
	 */
	const getQueryParam = (key: string) => {
		return searchParams.get(key);
	};

	/**
	 * * Set multiple query parameters at once
	 *
	 * @param params Params object to set.
	 */
	const setQueryParams = useCallback(
		(params: QueryObject) => {
			// Create a new URLSearchParams object from the current query parameters
			const newSearchParams = new URLSearchParams(searchParams);

			// Merge the new parameters with the existing ones
			Object.entries(params).forEach(([key, value]) => {
				if (value !== null && value !== undefined && value !== '') {
					newSearchParams.set(key, String(value));
				} else {
					newSearchParams.delete(key);
				}
			});

			// Update the URL with the merged query parameters
			setSearchParams(newSearchParams);
		},
		[searchParams, setSearchParams]
	);

	/**
	 * * Remove a query parameter.
	 *
	 * @param key Key to remove query parameter and its value.
	 */
	const removeQueryParam = (key: string) => {
		const newSearchParams = new URLSearchParams(searchParams);
		newSearchParams.delete(key);
		setSearchParams(newSearchParams);
	};

	/**
	 * * Get all query parameters as an object.
    
	 * @returns Query object.
	 */
	const getAllQueryParams = useCallback(() => {
		const params: QueryObject = {};

		searchParams.forEach((value, key) => {
			params[key] = value;
		});

		return params;
	}, [searchParams]);

	/**
	 * * Convert the current query parameters into a query string.
	 *
	 * @returns The full query string.
	 */
	const getQueryString = () => {
		const params = getAllQueryParams();
		return generateQueryParams(params);
	};

	// useEffect(() => {
	// 	setQueryParams(getAllQueryParams());
	// }, [getAllQueryParams, setQueryParams]);

	return {
		getQueryParam,
		setQueryParams,
		removeQueryParam,
		getAllQueryParams,
		getQueryString,
	};
};

export default useQueryParams;
