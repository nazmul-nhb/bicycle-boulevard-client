import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { baseApi } from '../api/baseApi';
import { authReducer } from '../features/authSlice';
import { cartReducer } from '../features/cartSlice';
import { orderReducer } from '../features/orderSlice';
import { themeReducer } from '../features/themeSlice';

const rootReducer = combineReducers({
	[baseApi.reducerPath]: baseApi.reducer,
	auth: authReducer,
	cart: cartReducer,
	order: orderReducer,
	theme: themeReducer,
});

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
});

export type TRootState = ReturnType<typeof store.getState>;

export type TAppDispatch = typeof store.dispatch;
