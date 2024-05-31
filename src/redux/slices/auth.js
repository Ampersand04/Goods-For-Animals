import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

const initialState = {
    user: null,
    token: null,
    status: 'idle',
    error: null,
};

export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async ({ fullname, email, password }) => {
        const response = await axios.post('/register', { fullname, email, password });
        return response.data;
    },
);

export const loginUser = createAsyncThunk('auth/loginUser', async ({ email, password }) => {
    const response = await axios.post('/login', { email, password });
    return response.data;
});

export const fetchUser = createAsyncThunk('auth/fetchUser', async () => {
    const response = await axios.get('/me');
    return response.data.user;
});

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logoutUser: (state) => {
            state.user = null;
            state.token = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload.user;
                state.token = action.payload.token;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(loginUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload.user;
                state.token = action.payload.token;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(fetchUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload;
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export const { logoutUser } = authSlice.actions;

export const selectIsAuth = (state) => Boolean(state.auth.user);
export const selectUser = (state) => state.auth.user;

export const authReducer = authSlice.reducer;
