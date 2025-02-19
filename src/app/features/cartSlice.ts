import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { configs } from '../../configs/site_configs';
import type { ICartItem, ICartState } from '../../types';
import {
	getFromLocalStorage,
	removeFromLocalStorage,
	saveToLocalStorage,
} from '../../utils/localStorage';
import { type TRootState } from '../store';

const getCurrentDateString = () => new Date().toISOString();

const totalItems = () => getFromLocalStorage<ICartItem[]>(configs.cart_key) || [];

const initialState: ICartState = {
	items: totalItems(),
	total: totalItems().reduce((acc, item) => acc + item.quantity, 0),
};

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addToCart: (state, action: PayloadAction<Pick<ICartItem, 'id' | 'quantity'>>) => {
			const { id, quantity } = action.payload;

			const matchedIdx = state.items.findIndex((item) => item.id === id);

			if (matchedIdx !== -1) {
				state.items[matchedIdx].quantity += quantity;
				state.items[matchedIdx].date = getCurrentDateString();
			} else {
				state?.items.push({ id, quantity, date: getCurrentDateString() });
			}

			state.total += quantity;

			saveToLocalStorage(configs.cart_key, state.items);
		},

		removeQuantityFromCart: (state, action: PayloadAction<ICartItem['id']>) => {
			const matchedIdx = state.items.findIndex((item) => item.id === action.payload);

			if (matchedIdx !== -1) {
				const matched = state.items[matchedIdx];

				if (matched.quantity <= 1) {
					state.total -= matched.quantity;

					state.items = state.items.filter((item) => item.id !== action.payload);
				} else {
					state.total -= 1;

					state.items[matchedIdx].quantity -= 1;
					state.items[matchedIdx].date = getCurrentDateString();
				}

				saveToLocalStorage(configs.cart_key, state.items);
			}
		},

		removeSpecificItem: (state, action: PayloadAction<ICartItem['id']>) => {
			if (state.items) {
				const matchedIdx = state.items.findIndex(
					(item) => item.id === action.payload
				);

				if (matchedIdx !== -1) {
					state.total -= state.items[matchedIdx].quantity;

					state.items = state.items.filter((item) => item.id !== action.payload);

					saveToLocalStorage(configs.cart_key, state.items);
				}
			}
		},

		removeCart: (state) => {
			state.items = [];
			state.total = 0;

			removeFromLocalStorage(configs.cart_key);
		},
	},
});

export const { addToCart, removeQuantityFromCart, removeSpecificItem, removeCart } =
	cartSlice.actions;

export const selectCart = (state: TRootState) => state.cart;
export const selectItems = (state: TRootState) => state.cart.items;
export const selectCartTotal = (state: TRootState) => state.cart.total;
export const selectTargetItem = (state: TRootState, id: string) =>
	state.cart.items.find((item) => item.id === id);

export const cartReducer = cartSlice.reducer;
