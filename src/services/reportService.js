import axios from 'axios';
import API_BASE from '../config/apiConfig';


export const fetchAllReports = async () => {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_BASE}/reports/getAllReports`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
    return response.data
}

export const getStatusHistory = async (reportId) => {
    const token = localStorage.getItem('token');
    const res = await axios.get(`${API_BASE}/reports/${reportId}/status-history`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data
}