import {configureStore} from '@reduxjs/toolkit';
import { apiSlice } from './slices/apiSlice';
import cartSlice from './slices/cartSlice';

export const store = configureStore({
    reducer:{
        [apiSlice.reducerPath]: apiSlice.reducer,
        cart: cartSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
});