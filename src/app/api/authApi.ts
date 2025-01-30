import type { IServerResponse, ILoginResponse } from '../../types/server';
import type { ICredentials, ISingleUser } from '../../types/user';
import { setCurrentUser, setToken } from '../features/authSlice';
import { baseApi } from './baseApi';

export const authApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		registerUser: builder.mutation({
			query: (formData: FormData) => ({
				url: 'auth/register',
				method: 'POST',
				body: formData,
			}),
		}),

		loginUser: builder.mutation<IServerResponse<ILoginResponse>, ICredentials>({
			query: (credentials) => ({
				url: 'auth/login',
				method: 'POST',
				body: credentials,
			}),
			invalidatesTags: ['User'],
			async onQueryStarted(_args, { dispatch, queryFulfilled }) {
				try {
					const { data } = await queryFulfilled;

					if (data?.data) {
						dispatch(setToken(data.data.token));
						dispatch(setCurrentUser(data.data.user));
						// dispatch(authApi.endpoints.getMe.initiate());
					}
				} catch (error) {
					console.error(error);
				}
			},
		}),

		getMe: builder.query<IServerResponse<ISingleUser>, void>({
			query() {
				return {
					url: 'auth/profile',
					credentials: 'include',
				};
			},

			async onQueryStarted(_args, { dispatch, queryFulfilled }) {
				try {
					const { data } = await queryFulfilled;

					if (data?.data) {
						dispatch(setCurrentUser(data?.data));
					}
				} catch (error) {
					console.error(error);
				}
			},
			providesTags: ['User'],
		}),
	}),
	overrideExisting: false,
});

export const { useRegisterUserMutation, useLoginUserMutation, useGetMeQuery, useLazyGetMeQuery } = authApi;
