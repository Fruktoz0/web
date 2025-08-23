import axios from 'axios';
import API_BASE from '../config/apiConfig';

export const login = async (email, password) => {
    const response = await axios.post(`${API_BASE}/auth/login`, { email, password });
    return response;
}

export const fetchUser = async (token) => {
    try {
        const response = await axios.get(`${API_BASE}/auth/user`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response
    } catch (error) {
        throw error.response || error;
    }
}

export const register = async (username, email, password, confirmPassword) => {
    try {
        const response = await axios.post(`${API_BASE}/auth/register`, {
            username,
            email,
            password,
            confirmPassword
        })
        return response
    } catch (error) {
            throw error.response || error;
    }
}
