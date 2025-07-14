import axios from 'axios';
import API_BASE from '../config/apiConfig';


export const fetchAllReports = async (token) => {
    const response = await axios.get(`${API_BASE}/reports/getAllReports`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
    return response.data
}