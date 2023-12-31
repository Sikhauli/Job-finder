// store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import loadingReducer from "./loadingslice";


const store = configureStore({
    reducer: {
        loading: loadingReducer,
        auth: authReducer,
    },
});

export default store;
