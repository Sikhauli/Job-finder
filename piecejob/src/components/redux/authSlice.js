import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    authToken: null,
    currentUser: null,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuthToken: (state, action) => {
            state.authToken = action.payload;
            state.error = null;
        },
        setCurrentUser: (state, action) => {
            state.currentUser = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        clearAuthData: (state) => {
            state.authToken = null;
            state.currentUser = null;
            state.error = null;
        },
    },
});

export const { setAuthToken, setCurrentUser, setError, clearAuthData } = authSlice.actions;
export const selectAuthToken = (state) => state.auth.authToken;
export const selectCurrentUser = (state) => state.auth.currentUser;
export const selectError = (state) => state.auth.error;

export default authSlice.reducer;
