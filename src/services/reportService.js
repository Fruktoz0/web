import axios from 'axios';
import API_BASE from '../config/apiConfig';
import { getErrorMessage } from '@/utils/getErrorMessage';


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

export const getStatusDuration = async (reportId) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${API_BASE}/reports/status-duration/${reportId}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        return response.data
    } catch (error) {
        throw getErrorMessage(error)
    }
}

export const getStatusAverage = async () => {
    try {
        const token = localStorage.getItem('token')
        const response = await axios.get(`${API_BASE}/reports/status-duration/average`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        return response.data
    } catch (error) {
        throw getErrorMessage(error)
    }
}