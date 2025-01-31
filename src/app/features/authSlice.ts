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
	user: null,
	token: getFromLocalStorage(configs.token_key),
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setToken: (state, action: PayloadAction<ILoggedInState['token']>) => {
			state.token = action.payload;

			saveToLocalStorage(configs.token_key, action.payload);
		},

		setCurrentUser: (state, action: PayloadAction<ILoggedInState['user']>) => {
			state.user = action.payload;
		},

		logOut: (state) => {
			state.user = null;
			state.token = null;

			removeFromLocalStorage(configs.token_key);
		},
	},
});

export const { setToken, setCurrentUser, logOut } = authSlice.actions;

export const authReducer = authSlice.reducer;

export const selectUser = (state: TRootState) => state.auth.user;
export const selectToken = (state: TRootState) => state.auth.token;
