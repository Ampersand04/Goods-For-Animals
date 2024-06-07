import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

const initialState = {
    goods: [],
    status: 'idle',
    error: null,
    favoriteMessage: null,
};

export const createProduct = createAsyncThunk('products/createProduct', async (formData) => {
    const response = await axios.post('/create', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
});

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
    const response = await axios.get('/get-all-goods');
    return response.data;
});

export const searchProducts = createAsyncThunk(
    'products/searchProducts',
    async ({ query, categorySort, typeSort, priceRange }) => {
        const response = await axios.post('/get-serching-goods', {
            query,
            categorySort,
            typeSort,
            priceRange,
        });
        return response.data;
    },
);

export const editProduct = createAsyncThunk('products/editProduct', async ({ id, newData }) => {
    const response = await axios.put('/edit', { id, newData });
    return response.data;
});

export const deleteProduct = createAsyncThunk('products/deleteProduct', async (id) => {
    const response = await axios.delete('/delete', { data: { id } });
    return response.data;
});

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createProduct.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.goods.push(action.payload);
            })
            .addCase(createProduct.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(fetchProducts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.goods = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(searchProducts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(searchProducts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.goods = action.payload;
            })
            .addCase(searchProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(editProduct.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(editProduct.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const index = state.goods.findIndex(
                    (good) => good.id === action.payload.updatedData.id,
                );
                state.goods[index] = action.payload.updatedData;
            })
            .addCase(editProduct.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(deleteProduct.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.goods = state.goods.filter((good) => good.id !== action.meta.arg);
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export const productsSliceStatus = (state) => state.goods.status;

export const productsSliceReducer = productsSlice.reducer;
