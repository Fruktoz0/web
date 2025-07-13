import axios from 'axios';
import API_BASE from '../config/apiConfig';

export const login = async (email, password) => {
    const response = await axios.post(`${API_BASE}/auth/login`, { email, password });
    return response.data;
}

export const fetchUser = async (token) => {
    try {
        const response = await axios.get(`${API_BASE}/auth/user`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;

    } catch (error) {
        throw error;
    }


}