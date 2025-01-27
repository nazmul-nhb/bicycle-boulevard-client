import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { TRootState } from '../store';
import {
	getFromLocalStorage,
	removeFromLocalStorage,
	saveToLocalStorage,
} from '../../utils/localStorage';
import type { ILoggedInState } from '../../types/user';
import { configs } from '../../configs/site_configs';

const initialState: ILoggedInState = {
	user: getFromLocalStorage(configs.user_key),
	token: getFromLocalStorage(configs.token_key),
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		logIn: (state, action: PayloadAction<ILoggedInState>) => {
			const { user, token } = action.payload;
			state.user = user;
			state.token = token;
			saveToLocalStorage(configs.user_key, user);
			saveToLocalStorage(configs.token_key, token);
		},

		logOut: (state) => {
			state.user = null;
			state.token = null;
			removeFromLocalStorage(configs.user_key);
			removeFromLocalStorage(configs.token_key);
		},
	},
});

export const { logIn, logOut } = authSlice.actions;

export const authReducer = authSlice.reducer;

export const currentUser = (state: TRootState) => state.auth.user;
export const currentUserToken = (state: TRootState) => state.auth.token;
