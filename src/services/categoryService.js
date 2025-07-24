import axios from "axios"
import API_BASE from "@/config/apiConfig"

export const fetchAllCategories = async () => {
    const response = await axios.get(`${API_BASE}/categories/list`)
    return response.data
}

export const createCategory = async (form) => {
    const token = localStorage.getItem("token")
    const response = await axios.post(`${API_BASE}/categories/create`, form, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response.data;
}

export const deleteCategory = async (id) => {
    const token = localStorage.getItem("token")
    const response = await axios.delete(`${API_BASE}/categories/delete/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response.data;
}