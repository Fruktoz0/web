import React, { useState, useEffect } from 'react'
import axios from 'axios';
import API_BASE from '@/config/apiConfig';

function AdminDashboard() {

    const [userCount, setUserCount] = useState(0)
    const [reportCount, setReportCount] = useState(0)
    const [voteCount, setVoteCount] = useState(0)

    useEffect(() => {
        const fetchSummary = async () => {
            try {
                const token = localStorage.getItem("token")
                const res = await axios.get(`${API_BASE}/summary/allCount`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                setUserCount(res.data.userCount)
                setReportCount(res.data.reportCount)
                setVoteCount(res.data.voteCount)

            } catch (err) {
                console.error("Hiba az összesített adatok lekérdezésnél!", err)
            }
        }
        fetchSummary()
    }, [])

    return (
        <div>
            <div className="grid grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded shadow">
                    <h2 className="text-sm text-gray-500">Felhasználók száma</h2>
                    <p className="text-2xl font-bold text-yellow-600">{userCount}</p>
                </div>
                <div className="bg-white p-4 rounded shadow">
                    <h2 className="text-sm text-gray-500">Bejelentések száma</h2>
                    <p className="text-2xl font-bold text-blue-600">{reportCount}</p>
                </div>
                <div className="bg-white p-4 rounded shadow">
                    <h2 className="text-sm text-gray-500">Szavazésok száma:</h2>
                    <p className="text-2xl font-bold text-pink-600">{voteCount}</p>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-5">
                <div className="bg-white p-4 rounded shadow">
                    <h2 className="text-sm text-gray-500">Visszautasított feladatok </h2>
                </div>
                <div className="bg-white p-4 rounded shadow">
                    <h2 className="text-sm text-gray-500">Folyamatban lévő feladatok</h2>
                </div>


            </div>
        </div>


    )
}
export default AdminDashboard