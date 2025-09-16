import axios from 'axios'
import API_BASE from '@/config/apiConfig'
import { getErrorMessage } from '@/utils/getErrorMessage'

//Összes kihívás lekérése
export const getAllChallenges = async () => {
    try {
        const token = localStorage.getItem("token")
        const response = await axios.get(`${API_BASE}/challenges/all`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data
    } catch (err) {
        throw getErrorMessage(err)
    }
}

//Összes archivált lekérése
export const getAllArchivedChallenges = async () => {
    try {
        const token = localStorage.getItem("token")
        const response = await axios.get(`${API_BASE}/challenges/archived`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data
    } catch (err) {
        throw getErrorMessage(err)
    }
}

//Jóváhagyásra váró kihívások lekérése
export const getAllPendingChallenges = async () => {
    try {
        const token = localStorage.getItem("token")
        const response = await axios.get(`${API_BASE}/challenges/pending`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data
    } catch (err) {
        throw getErrorMessage(err)
    }
}

//Adott intézményhez kapcsolt kihívások lekérdezése
export const getAssignedChallenges = async () => {
    try {
        const token = localStorage.getItem("token")
        const response = await axios.get(`${API_BASE}/challenges/assigned-challenges`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data
    } catch (err) {
        throw getErrorMessage(err)
    }
}

