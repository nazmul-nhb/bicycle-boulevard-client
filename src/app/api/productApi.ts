import { baseApi } from './baseApi';

export const productApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		createProduct: builder.mutation({
			query: (formData: FormData) => ({
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
