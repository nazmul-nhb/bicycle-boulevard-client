import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ReactNode } from 'react';
import type { TRootState } from '../store';

interface IError {
	message: string;
	type: string;
}

interface IModalPayload {
	title?: string;
	content?: ReactNode;
	show?: boolean;
	width?: number | string;
}

interface IState {
	error: IError | null;
	isModal: boolean;
	modalLoading: boolean;
	defaultLoading: boolean;
	title: string;
	content: ReactNode;
	show: boolean;
	width: number | string;
	iSModalUp: boolean;
}

const initialState: IState = {
	error: null,
	isModal: false,
	iSModalUp: false,
	modalLoading: false,
	defaultLoading: false,
	title: '',
	content: null,
	show: false,
	width: '',
};

const modalSlice = createSlice({
	name: 'modal',
	initialState,
	reducers: {
		setError(state, action: PayloadAction<IError>) {
			state.error = action.payload;
		},

		setModal(state, action: PayloadAction<boolean>) {
			state.isModal = action.payload;
		},

		setCommonDrawer(state, action: PayloadAction<IModalPayload | undefined>) {
			const { title, content, show, width } =
				action?.payload || ({} as IModalPayload);

			state.title = title || '';
			state.content = content || null;
			state.show = show || false;
			state.width = width || 720;
		},

		setCommonModal(state, action: PayloadAction<IModalPayload | undefined>) {
			const { title, content, show, width } =
				action?.payload || ({} as IModalPayload);

			state.title = title || '';
			state.content = content || null;
			state.show = show || false;
			state.width = width || 720;
		},

		setModalSub(state, action: PayloadAction<boolean>) {
			state.iSModalUp = action.payload;
		},

		setModalLoading(state, action: PayloadAction<boolean>) {
			state.modalLoading = action.payload;
		},

		setDefaultLoading(state, action: PayloadAction<boolean>) {
			state.defaultLoading = action.payload;
		},
	},
});

export const {
	setError,
	setCommonDrawer,
	setModalLoading,
	setDefaultLoading,
	setModal,
	setCommonModal,
} = modalSlice.actions;

export const modalCommon = (state: TRootState) => state.modal;

export const modalReducer = modalSlice.reducer;
