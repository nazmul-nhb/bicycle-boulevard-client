import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type MappingAlgorithm, theme } from 'antd';
import type { TRootState } from '../store';
import { saveToLocalStorage } from '../../utils/localStorage';
import { configs } from '../../configs/site_configs';

interface IState {
	theme: MappingAlgorithm | MappingAlgorithm[] | undefined;
}

const initialState: IState = {
	theme:
		localStorage.getItem(configs.theme_name) === 'lightTheme'
			? theme.defaultAlgorithm
			: theme.darkAlgorithm,
};

const themeSlice = createSlice({
	name: 'theme',
	initialState,
	reducers: {
		setTheme(
			state,
			action: PayloadAction<MappingAlgorithm | MappingAlgorithm[] | undefined>
		) {
            state.theme = action.payload;
            
			if (state.theme === theme.darkAlgorithm) {
				saveToLocalStorage(configs.theme_name, 'darkTheme');
			} else {
				saveToLocalStorage(configs.theme_name, 'lightTheme');
			}
		},
	},
});

export const { setTheme } = themeSlice.actions;

export const selectTheme = (state: TRootState) => state.theme;

export const themeReducer = themeSlice.reducer;
