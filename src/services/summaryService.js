import axios from 'axios';
import API_BASE from '../config/apiConfig';
import { getErrorMessage } from '@/utils/getErrorMessage';

export const getSummary = async () => {
    try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${API_BASE}/summary/allCount`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return res.data
    } catch (error) {
        throw getErrorMessage(error)
    }
}