import { configs } from '../../configs/site_configs';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
	reducerPath: 'baseApi',
	baseQuery: fetchBaseQuery({
		baseUrl: configs.server_api,
		credentials: 'include',
	}),
	endpoints: () => ({}),
});
