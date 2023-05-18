import {configureStore} from '@reduxjs/toolkit';
import { apiSlice } from './slices/apiSlice';
import cartSlice from './slices/cartSlice';
import authSlice from './slices/authSlice';

export const store = configureStore({
    reducer:{
        [apiSlice.reducerPath]: apiSlice.reducer,
        cart: cartSlice,
        auth: authSlice,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
});