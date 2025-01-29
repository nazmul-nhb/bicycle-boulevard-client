import { configs } from '../../configs/site_configs';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { TRootState } from '../store';

export const baseApi = createApi({
	reducerPath: 'baseApi',
	tagTypes: ['User', 'Users', 'Product', 'Products', 'Order', 'Orders'],
	baseQuery: fetchBaseQuery({
		baseUrl: configs.server_api,
		credentials: 'include',
		prepareHeaders: (headers, { getState }) => {
			const token = (getState() as TRootState).auth.token;

			if (token) {
				headers.set('Authorization', `Bearer ${token}`);
			}
			return headers;
		},
	}),
	endpoints: () => ({}),
});
