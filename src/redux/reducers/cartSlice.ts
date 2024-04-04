import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type CartItemType = {
  title: string;
  price: number;
  count: number;
  image: string;
  id: number;
};

export type CartItemsListType = CartItemType[];

const initialState: CartItemsListType = [];

export const cartItemsSlice = createSlice({
  name: 'cartItems',
  initialState,
  reducers: {
    addItemToCart: (state, action: PayloadAction<CartItemType>) => {
      state.push(action.payload);
      console.log(`Item ${action.payload.title} added`);
    },
    incrementCountOfItemInCart: (state, action: PayloadAction<number>) => {
      const indexOfItemToBeUpdated = state.findIndex(item => item.id === action.payload);
      state[indexOfItemToBeUpdated].count++;
    },
    decrementCountOfItemInCart: (state, action: PayloadAction<number>) => {
      const indexOfItemToBeUpdated = state.findIndex(item => item.id === action.payload);
      state[indexOfItemToBeUpdated].count--;
    },
    removeItemFromCart: (state, action: PayloadAction<number>) => {
      const indexOfItemToBeDeleted = state.findIndex(item => item.id === action.payload);
      state.splice(indexOfItemToBeDeleted, 1);
    },
    removeAllItemsFromCart: state => {
      state.splice(0);
    },
  },
});

export const {
  addItemToCart,
  incrementCountOfItemInCart,
  decrementCountOfItemInCart,
  removeItemFromCart,
  removeAllItemsFromCart,
} = cartItemsSlice.actions;
export default cartItemsSlice.reducer;
