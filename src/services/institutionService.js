import axios from "axios"
import API_BASE from "@/config/apiConfig"



export const getAllInstitutions = async () => {
    const response = await axios.get(`${API_BASE}/institutions/`)
    return response.data;
}

export const getInstitutionsById = async (id) => {
    const response = await axios.get(`${API_BASE}/${id}`)
    return response.data;
}

export const updateInstitution = async (id, data) => {
     const token = localStorage.getItem("token")
    const response = await axios.put(`${API_BASE}/institutions/update/${id}`, data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
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
