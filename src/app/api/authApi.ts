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
        
		loginUser: builder.mutation({
			query: (credentials: { email: string; password: string }) => ({
				url: 'auth/login',
				method: 'POST',
				body: credentials, 
			}),
		}),
	}),
	overrideExisting: false,
});

export const { useRegisterUserMutation, useLoginUserMutation } = authApi;
