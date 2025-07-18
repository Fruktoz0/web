import axios from "axios"
import API_BASE from "@/config/apiConfig"

export const fetchAllCategories = async () => {
    const response = await axios.get(`${API_BASE}/categories/list`)
    return response.data
}

export const createCategory = async (form) =>{
    const response = await axios.post(`${API_BASE}/categories/create`, form)
    return response.data;
}