import { createSelector, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { configs } from '../../configs/site_configs';
import type { ICartProduct } from '../../types/product.types';
import {
	getFromSessionStorage,
	removeFromSessionStorage,
	saveToSessionStorage,
} from '../../utils/sessionStorage';
import type { TRootState } from '../store';

interface OrderState {
	orderItems: ICartProduct[];
}

const initialState: OrderState = {
	orderItems: getFromSessionStorage(configs.order_key) || [],
};

const orderSlice = createSlice({
	name: 'order',
	initialState,
	reducers: {
		addToOrder: (state, action: PayloadAction<ICartProduct>) => {
			const existingItem = state.orderItems.find(
				(item) => item._id === action.payload._id
			);

			if (existingItem) {
				// Update quantity if item already exists
				existingItem.cartQuantity = action.payload.cartQuantity;
			} else {
				// Add new item to the order
				state.orderItems.push(action.payload);
			}

			saveToSessionStorage(configs.order_key, state.orderItems);
		},

		removeFromOrder: (state, action: PayloadAction<string>) => {
			state.orderItems = state.orderItems.filter(
				(item) => item._id !== action.payload
			);

			saveToSessionStorage(configs.order_key, state.orderItems);
		},

		updateOrderItemQuantity: (
			state,
			action: PayloadAction<{ id: string; quantity: number }>
		) => {
			const item = state.orderItems.find((item) => item._id === action.payload.id);

			if (item) {
				item.cartQuantity = action.payload.quantity;
			}

			saveToSessionStorage(configs.order_key, state.orderItems);
		},

		clearOrder: (state) => {
			state.orderItems = [];
			removeFromSessionStorage(configs.order_key);
		},
	},
});

export const { addToOrder, removeFromOrder, updateOrderItemQuantity, clearOrder } =
	orderSlice.actions;

export const selectOrderItems = (state: TRootState) => state.order.orderItems;

export const selectOrderTotal = createSelector([selectOrderItems], (orderItems) => {
	const totalPrice = orderItems.reduce(
		(acc, item) => acc + item.price * item.cartQuantity,
		0
	);

	const totalItems = orderItems.reduce((acc, item) => acc + item.cartQuantity, 0);

	return { totalPrice, totalItems };
});

export const orderReducer = orderSlice.reducer;
