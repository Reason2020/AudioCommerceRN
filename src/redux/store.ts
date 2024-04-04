import { configureStore } from '@reduxjs/toolkit';

import cartItemsReducer from './reducers/cartSlice';
import { productsApi } from './services/productsApi';
import { categoriesApi } from './services/categoriesApi';

export const store = configureStore({
  reducer: {
    [productsApi.reducerPath]: productsApi.reducer,
    [categoriesApi.reducerPath]: categoriesApi.reducer,
    cartItems: cartItemsReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat([productsApi.middleware, categoriesApi.middleware]),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
