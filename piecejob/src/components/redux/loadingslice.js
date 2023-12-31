
import { createSlice } from "@reduxjs/toolkit";

const loadingSlice = createSlice({
    name: "loading",
    initialState: {
        value: false,
    },
    reducers: {
        showLoading: (state) => {
            console.log('Show loading action dispatched');
            state.value = true;
        },
        hideLoading: (state) => {
            console.log('Hide loading action dispatched');
            state.value = false;
        },
    },
});

export const { showLoading, hideLoading } = loadingSlice.actions;
export default loadingSlice.reducer;
