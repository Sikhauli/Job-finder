// api.js

import axios from 'axios';
import { setAuthToken, setCurrentUser, setError } from '../redux/authSlice';

const API_BASE_URL = 'http://localhost:1960/api/auth';

export const loginUser = async (formData, dispatch) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/login`, formData);
        const { token, user } = response.data;

        dispatch(setAuthToken(token));
        dispatch(setCurrentUser(user));

        return { token, user };
    } catch (error) {
        console.error('Login error:', error);
        dispatch(setError('Login failed')); 
        throw error;
    }
};

export const registerUser = async (formData, dispatch) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/register`, formData);
        const { token, user } = response.data;

        dispatch(setAuthToken(token));
        dispatch(setCurrentUser(user));

        return { token, user };
    } catch (error) {
        console.error('Registration error:', error);
        dispatch(setError('Registration failed')); 
        throw error;
    }
};
