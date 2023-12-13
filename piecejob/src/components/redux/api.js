import axios from 'axios';
import { setAuthToken, setCurrentUser, setError } from '../redux/authSlice';
import { API_BASE_URL, AUTH_ENDPOINTS, API } from '../../helpers/constants'

export const loginUser = async (formData, dispatch) => {
    try {
        const response = await axios.post(`${API_BASE_URL}user/login`, formData);
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
        const response = await axios.post(`${API_BASE_URL}user/register`, formData);
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
