import type { IOrderData, IOrderRes } from '../../types/order.types';
import type { IServerResponse } from '../../types/server.types';
import { baseApi } from './baseApi';

export const orderApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		createOrder: builder.mutation<IServerResponse<IOrderRes>, IOrderData[]>({
			query: (order) => {
				const orderData = { products: order };

				return {
					url: 'orders',
					method: 'POST',
					body: orderData,
				};
			},
			invalidatesTags: ['Orders', 'Products', 'Product'],
		}),

		getAllOrders: builder.query<IServerResponse<unknown>, void>({
			query: () => {
				return {
					url: `orders`,
					method: 'GET',
				};
			},
			providesTags: ['Orders'],
		}),

		getSingleOrder: builder.query<IServerResponse<unknown>, string>({
			query: (id) => ({
				url: `orders/`.concat(id),
				method: 'GET',
			}),
			providesTags: (_r, _e, id) => [{ id, type: 'Order' }],
		}),

		deleteOrder: builder.mutation<IServerResponse<void>, string>({
			query: (id) => ({
				url: `orders/`.concat(id),
				method: 'DELETE',
			}),
			invalidatesTags: (_r, _e, id) => [{ id, type: 'Order' }, { type: 'Orders' }],
		}),
	}),
	overrideExisting: false,
});

export const {
	useCreateOrderMutation,
	useGetSingleOrderQuery,
	useGetAllOrdersQuery,
	useDeleteOrderMutation,
} = orderApi;
