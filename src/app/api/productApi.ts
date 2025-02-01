import type { IProduct } from '../../types/product.types';
import type { IServerResponse } from '../../types/server.types';
import { baseApi } from './baseApi';

export const productApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		createProduct: builder.mutation<IServerResponse<IProduct>, FormData>({
			query: (formData) => ({
				url: 'products',
				method: 'POST',
				body: formData,
			}),
			invalidatesTags: ['Products'],
		}),
	}),
	overrideExisting: false,
});

export const { useCreateProductMutation } = productApi;
