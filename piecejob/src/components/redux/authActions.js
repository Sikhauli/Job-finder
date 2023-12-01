import { login as apiLogin, register as apiRegister } from './api';
import { setAuthToken, clearAuthToken, setError } from './authSlice';

export const login = (formData) => async (dispatch) => {
    try {
        const response = await apiLogin(formData);
        dispatch(setAuthToken(response.token));
    } catch (error) {
        dispatch(setError('Invalid credentials'));
        dispatch(clearAuthToken());
    }
};

export const register = (formData) => async (dispatch) => {
    try {
        await apiRegister(formData);
    } catch (error) {
        dispatch(setError('Registration failed'));
    }
};
