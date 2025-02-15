import { generateQueryParams } from 'nhb-toolbox';
import type { IQueryParams } from '../../types';
import type { IProduct, IProductDetails } from '../../types/product.types';
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

		getAllProducts: builder.query<IServerResponse<IProduct[]>, IQueryParams>({
			query: (queryObject) => {
				const queryParams = generateQueryParams(queryObject);

				return {
					url: `products`.concat(queryParams),
					method: 'GET',
				};
			},
			providesTags: ['Products'],
		}),

		getSingleProduct: builder.query<IServerResponse<IProductDetails>, string>({
			query: (id) => ({
				url: `products/`.concat(id),
				method: 'GET',
			}),
			providesTags: (_r, _e, id) => [{ id, type: 'Product' }],
		}),

		deleteProduct: builder.mutation<IServerResponse<void>, string>({
			query: (id) => ({
				url: `products/`.concat(id),
				method: 'DELETE',
			}),
			invalidatesTags: (_r, _e, id) => [
				{ id, type: 'Product' },
				{ type: 'Products' },
			],
		}),

		updateProduct: builder.mutation<
			IServerResponse<void>,
			{ id: string; data: FormData }
		>({
			query: ({ id, data }) => ({
				url: `products/`.concat(id),
				method: 'PATCH',
				body: data,
			}),
			invalidatesTags: (_r, _e, { id }) => [
				{ id, type: 'Product' },
				{ type: 'Products' },
			],
		}),
	}),
	overrideExisting: false,
});

export const {
	useCreateProductMutation,
	useGetSingleProductQuery,
	useGetAllProductsQuery,
	useDeleteProductMutation,
	useUpdateProductMutation,
} = productApi;
