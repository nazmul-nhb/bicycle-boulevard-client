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

		getAllProducts: builder.query<IServerResponse<IProduct[]>, string>({
			query: (query) => ({
				url: `products`.concat(query),
				method: 'GET',
			}),
			providesTags: ['Products'],
		}),
	}),
	overrideExisting: false,
});

export const { useCreateProductMutation, useGetAllProductsQuery } = productApi;
