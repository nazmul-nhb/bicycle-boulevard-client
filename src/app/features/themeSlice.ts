import type { TRootState } from '../store';
import { configs } from '../../configs/site_configs';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { getFromLocalStorage, saveToLocalStorage } from '../../utils/localStorage';

interface IState {
	theme: 'light' | 'dark';
}

const initialState: IState = {
	theme:
		getFromLocalStorage<IState['theme']>(configs.theme_name) === 'light'
			? 'light'
			: 'dark',
};

const themeSlice = createSlice({
	name: 'theme',
	initialState,
	reducers: {
		setTheme(state, action: PayloadAction<'light' | 'dark'>) {
			state.theme = action.payload;

			saveToLocalStorage(
				configs.theme_name,
				action.payload === 'dark' ? 'dark' : 'light'
			);
		},
	},
});

export const { setTheme } = themeSlice.actions;

export const selectTheme = (state: TRootState) => state.theme.theme;

export const themeReducer = themeSlice.reducer;
