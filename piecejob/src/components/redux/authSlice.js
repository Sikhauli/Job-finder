import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    authToken: localStorage.getItem('authToken') || null,
    currentUser: JSON.parse(localStorage.getItem('currentUser')) || null,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuthToken: (state, action) => {
            state.authToken = action.payload;
            localStorage.setItem('authToken', action.payload);
            state.error = null;
        },
        setCurrentUser: (state, action) => {
            state.currentUser = action.payload;
            localStorage.setItem('currentUser', JSON.stringify(action.payload));
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        clearAuthData: (state) => {
            state.authToken = null;
            state.currentUser = null;
            state.error = null;
            localStorage.removeItem('authToken');
            localStorage.removeItem('currentUser');
        },
    },
});

export const { setAuthToken, setCurrentUser, setError, clearAuthData } = authSlice.actions;
export const selectAuthToken = (state) => state.auth.authToken;
export const selectCurrentUser = (state) => state.auth.currentUser;
export const selectError = (state) => state.auth.error;

export default authSlice.reducer;
