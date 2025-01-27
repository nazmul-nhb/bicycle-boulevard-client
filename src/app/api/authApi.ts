import type { IServerResponse, IToken } from '../../types/server';
import type { ICredentials } from '../../types/user';
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

		loginUser: builder.mutation<IServerResponse<IToken>, ICredentials>({
			query: (credentials) => ({
				url: 'auth/login',
				method: 'POST',
				body: credentials,
			}),
		}),
	}),
	overrideExisting: false,
});

export const { useRegisterUserMutation, useLoginUserMutation } = authApi;
