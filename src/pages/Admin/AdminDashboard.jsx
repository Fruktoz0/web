import React, { useState, useEffect } from 'react'
import { getSummary } from '@/services/summaryService'
import { getStatusAverage } from '@/services/reportService'

function AdminDashboard() {
    const [userCount, setUserCount] = useState(0)
    const [reportCount, setReportCount] = useState(0)
    const [voteCount, setVoteCount] = useState(0)
    const [statusAverage, setStatusAverage] = useState({})

    // Magyar címkék + színek a státuszokhoz
    const statusLabels = {
        open: "Új",
        rejected: "Elutasítva",
        in_progress: "Folyamatban",
        resolved: "Megoldva",
    }

    const statusColors = {
        open: "text-yellow-600",
        rejected: "text-red-600",
        in_progress: "text-blue-600",
        resolved: "text-green-600",
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getSummary()
                setUserCount(data.userCount)
                setReportCount(data.reportCount)
                setVoteCount(data.voteCount)

                const averages = await getStatusAverage()
                console.log("Átlag státuszidők:", averages) 
                setStatusAverage(averages)
            } catch (err) {
                console.error("Hiba az adatok lekérdezésénél!", err)
            }
        }
        fetchData()
    }, [])

    return (
        <div>
            {/* Összesített adatok */}
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
                    <h2 className="text-sm text-gray-500">Szavazások száma</h2>
                    <p className="text-2xl font-bold text-pink-600">{voteCount}</p>
                </div>
            </div>

            {/* Státusz átlagidők */}
            <div className="grid grid-cols-2 gap-4 mt-5">
                <div className="bg-white p-4 rounded shadow">
        
                    <p className="text-sm mt-3 text-gray-500">Mennyit töltenek a státuszokban:</p>

                    <div className="mt-3 space-y-2">
                        {"message" in statusAverage ? (
                            <p className="text-gray-500 italic">{statusAverage.message}</p>
                        ) : (
                            Object.entries(statusAverage).map(([status, values]) => (
                                <div key={status} className="flex justify-between border-b pb-1">
                                    <span className="capitalize text-sm text-gray-600">
                                        {statusLabels[status] || status}
                                    </span>
                                    <span className={`font-semibold text-sm ${statusColors[status] || "text-gray-800"}`}>
                                        {values.avgHours} óra (~{values.avgDays} nap)
                                    </span>
                                </div>
                            ))
                        )}
                    </div>

                </div>

                <div className="bg-white p-4 rounded shadow">
                    <h2 className="text-base font-semibold">Felhasználói adatok</h2>
                    <p className="text-sm mt-3 text-gray-500">Ide jöhet más statisztika.</p>
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard
