import axios from 'axios';
import API_BASE from '../config/apiConfig';
import { getErrorMessage } from '@/utils/getErrorMessage';

export const fetchAllUsers = async (token) => {
    try {
        const response = await axios.get(`${API_BASE}/admin/users`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (err) {
        throw getErrorMessage(err)
    }
}

export const updateUser = async (userId, data) => {
    try {
        const token = localStorage.getItem("token")
        return axios.put(`${API_BASE}/admin/user/${userId}`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    } catch (err) {
        throw getErrorMessage(err)
    }
}

export const assignUserToInstitution = async (userId, institutionId) => {
    try {
        const token = localStorage.getItem("token")
        const response = await axios.put(`${API_BASE}/admin/user/${userId}/institution`,
            { institutionId },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
        return response.data
    } catch (err) {
        throw getErrorMessage(err)
    }
}



