import type { IServerResponse } from '../../types/server.types';
import type { ISingleUser } from '../../types/user.types';
import { baseApi } from './baseApi';

export const userAdminApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		getAllUsers: builder.query<IServerResponse<ISingleUser[]>, void>({
			query: () => ({
				url: `users`,
				method: 'GET',
			}),
			providesTags: ['Users'],
		}),

		getSingleUser: builder.query<IServerResponse<ISingleUser>, string>({
			query: (id) => ({
				url: `users/`.concat(id),
				method: 'GET',
			}),
			providesTags: (_r, _e, id) => [{ id, type: 'User' }],
		}),

		deactivateUser: builder.mutation<IServerResponse<void>, string>({
			query: (id) => ({
				url: `admin/users/block/`.concat(id),
				method: 'PATCH',
			}),
			invalidatesTags: (_r, _e, id) => [{ id, type: 'User' }, { type: 'Users' }],
		}),

		reactivateUser: builder.mutation<IServerResponse<void>, string>({
			query: (id) => ({
				url: `admin/users/unblock/`.concat(id),
				method: 'PATCH',
			}),
			invalidatesTags: (_r, _e, id) => [{ id, type: 'User' }, { type: 'Users' }],
		}),

		updateUser: builder.mutation<IServerResponse<void>, { id: string; data: FormData }>(
			{
				query: ({ id, data }) => ({
					url: `users/`.concat(id),
					method: 'PATCH',
					body: data,
				}),
				invalidatesTags: (_r, _e, { id }) => [
					{ id, type: 'User' },
					{ type: 'Users' },
				],
			}
		),
	}),
	overrideExisting: false,
});

export const {
	useGetSingleUserQuery,
	useGetAllUsersQuery,
	useDeactivateUserMutation,
	useReactivateUserMutation,
	useUpdateUserMutation,
} = userAdminApi;
