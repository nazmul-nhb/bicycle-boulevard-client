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
	total: totalItems().reduce((acc, item) => acc + item.cartQuantity, 0),
};

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addToCart: (
			state,
			action: PayloadAction<Pick<ICartItem, 'id' | 'cartQuantity'>>
		) => {
			const { id, cartQuantity } = action.payload;

			const matchedIdx = state.items.findIndex((item) => item.id === id);

			if (matchedIdx !== -1) {
				state.items[matchedIdx].cartQuantity += cartQuantity;
				state.items[matchedIdx].date = getCurrentDateString();
			} else {
				state?.items.push({
					id,
					cartQuantity,
					date: getCurrentDateString(),
				});
			}

			state.total += cartQuantity;

			saveToLocalStorage(configs.cart_key, state.items);
		},

		removeQuantityFromCart: (
			state,
			action: PayloadAction<Pick<ICartItem, 'id' | 'cartQuantity'>>
		) => {
			const { id, cartQuantity } = action.payload;

			const matchedIdx = state.items.findIndex((item) => item.id === id);

			if (matchedIdx !== -cartQuantity) {
				const matched = state.items[matchedIdx];

				if (matched.cartQuantity <= cartQuantity) {
					state.total -= matched.cartQuantity;

					state.items = state.items.filter((item) => item.id !== id);
				} else {
					state.total -= cartQuantity;

					state.items[matchedIdx].cartQuantity -= cartQuantity;
					state.items[matchedIdx].date = getCurrentDateString();
				}

				saveToLocalStorage(configs.cart_key, state.items);
			}
		},

		removeSpecificCartItem: (state, action: PayloadAction<ICartItem['id']>) => {
			if (state.items) {
				const matchedIdx = state.items.findIndex(
					(item) => item.id === action.payload
				);

				if (matchedIdx !== -1) {
					state.total -= state.items[matchedIdx].cartQuantity;

					state.items = state.items.filter((item) => item.id !== action.payload);

					saveToLocalStorage(configs.cart_key, state.items);
				}
			}
		},

		clearCart: (state) => {
			state.items = [];
			state.total = 0;

			removeFromLocalStorage(configs.cart_key);
		},
	},
});

export const { addToCart, removeQuantityFromCart, removeSpecificCartItem, clearCart } =
	cartSlice.actions;

export const selectCart = (state: TRootState) => state.cart;
export const selectCartItems = (state: TRootState) => state.cart.items;
export const selectCartTotal = (state: TRootState) => state.cart.total;
export const targetCartItem = (state: TRootState, id: string) =>
	state.cart.items.find((item) => item.id === id);

export const cartReducer = cartSlice.reducer;
