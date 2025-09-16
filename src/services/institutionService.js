import axios from "axios"
import API_BASE from "@/config/apiConfig"
import { getErrorMessage } from "@/utils/getErrorMessage"



export const getAllInstitutions = async () => {
    try {
        const response = await axios.get(`${API_BASE}/institutions/`)
        return response.data;
    } catch (err) {
        throw getErrorMessage(err)
    }
}

export const getInstitutionsById = async (id) => {
    try {
        const response = await axios.get(`${API_BASE}/${id}`)
        return response.data;
    } catch (err) {
        throw getErrorMessage(err)
    }
}

export const updateInstitution = async (id, data) => {
    try {
        const token = localStorage.getItem("token")
        const response = await axios.put(`${API_BASE}/institutions/update/${id}`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (err) {
        throw getErrorMessage(err)
    }
}

export const deleteInstitution = async (id) => {
    const token = localStorage.getItem("token")
    const response = await axios.delete(`${API_BASE}/institutions/delete/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
}

export const createInstitution = async (data) => {
    const token = localStorage.getItem("token")
    const response = await axios.post(`${API_BASE}/Institutions/create`, data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response.data;
}
