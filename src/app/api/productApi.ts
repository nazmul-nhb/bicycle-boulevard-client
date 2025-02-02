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

		getAllProducts: builder.query<IServerResponse<IProduct[]>, string>({
			query: (query) => ({
				url: `products`.concat(query),
				method: 'GET',
			}),
			providesTags: ['Products'],
		}),

		getSingleProduct: builder.query<IServerResponse<IProductDetails>, string>({
			query: (id) => ({
				url: `products/`.concat(id),
				method: 'GET',
			}),
			providesTags: (_r, _e, id) => [{ id, type: 'Product' }],
		}),

		deleteProduct: builder.mutation<IServerResponse<undefined>, string>({
			query: (id) => ({
				url: `products/`.concat(id),
				method: 'DELETE',
			}),
			invalidatesTags: ['Products'],
		}),

		updateProduct: builder.mutation<
			IServerResponse<undefined>,
			{ id: string; data: FormData }
		>({
			query: ({ id, data }) => ({
				url: `products/`.concat(id),
				method: 'PUT',
				body: data,
			}),
			invalidatesTags: ['Products'],
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
