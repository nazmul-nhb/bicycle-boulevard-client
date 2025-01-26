import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { baseApi } from '../api/baseApi';

const rootReducer = combineReducers({
	[baseApi.reducerPath]: baseApi.reducer,
});

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(baseApi.middleware),
});

export type TRootState = ReturnType<typeof store.getState>;

export type TAppDispatch = typeof store.dispatch;
