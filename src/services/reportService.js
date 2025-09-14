import axios from 'axios';
import API_BASE from '../config/apiConfig';
import { getErrorMessage } from '@/utils/getErrorMessage';


export const fetchAllReports = async () => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${API_BASE}/reports/getAllReports`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        return response.data
    } catch (err) {
        throw getErrorMessage(err)
    }
}

export const fetchAssignedReports = async () => {
    try {
        const token = localStorage.getItem('token')
        const response = await axios.get(`${API_BASE}/reports/assignedReports`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data
    } catch (err) {
        throw getErrorMessage(err)
    }
}

export const getStatusHistory = async (reportId) => {
    try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${API_BASE}/reports/${reportId}/status-history`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return res.data
    } catch (err) {
        throw getErrorMessage(err)
    }
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

export const forwardReport = async (reportId, institutionId, categoryId, reason) => {
    try {
        const token = localStorage.getItem('token')
        const response = await axios.put(`${API_BASE}/reports/forward/${reportId}`, {
            institutionId,
            categoryId,
            reason
        }, {
            headers: { Authorization: `Bearer ${token}` }
        })
        return response.data
    } catch (error) {
        throw getErrorMessage(error)
    }
}

export const getForwardLogs = async (reportId) => {
    try {
        const token = localStorage.getItem('token')
        const response = await axios.get(`${API_BASE}/reports/${reportId}/forwardLogs`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        return response.data
    } catch (err) {
        throw getErrorMessage(err)
    }
}

export const statusChange = async (reportId, newStatus, comment) => {
    try {
        const token = localStorage.getItem('token')
        const response = await axios.post(`${API_BASE}/reports/${reportId}/status`, {
            statusId: newStatus,
            comment: comment
        }, {
            headers: { Authorization: `Bearer ${token}` }
        })
        return response.data
    } catch (error) {
        throw getErrorMessage(error)
    }
}

export const getReportById = async (reportId) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${API_BASE}/reports/${reportId}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        throw getErrorMessage(error);
    }
}