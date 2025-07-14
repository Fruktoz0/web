import axios from 'axios';
import API_BASE from '../config/apiConfig';

export const fetchAllUsers = async (token) => {
    const response = await axios.get(`${API_BASE}/admin/users`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
}



