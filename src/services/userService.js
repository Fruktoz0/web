import axios from 'axios';
import API_BASE from '../config/apiConfig';

export const fetchAllUsers = async (token) => {
    const response = await axios.get(`${API_BASE}/admin/users`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
}

export const updateUser = async (userId, data) =>{
    const token = localStorage.getItem("token")
    return axios.put(`${API_BASE}/admin/user/${userId}`, data,{
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
}



