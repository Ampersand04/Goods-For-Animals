import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './slices/auth';
import { productsSliceReducer } from './slices/product';

const store = configureStore({
    reducer: {
        auth: authReducer,
        product: productsSliceReducer,
    },
});

export default store;
