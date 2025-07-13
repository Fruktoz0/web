import React from 'react'

function AdminDashboard() {
    return (
        <div className="grid grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded shadow">
                <h2 className="text-sm text-gray-500">Felhasználók száma</h2>
                <p className="text-2xl font-bold text-yellow-600">5</p>
            </div>
            <div className="bg-white p-4 rounded shadow">
                <h2 className="text-sm text-gray-500">Bejelentések száma</h2>
                <p className="text-2xl font-bold text-blue-600"> 15</p>
            </div>
            <div className="bg-white p-4 rounded shadow">
                <h2 className="text-sm text-gray-500">Szavazésok száma:</h2>
                <p className="text-2xl font-bold text-pink-600">3</p>
            </div>
        </div>
    )
}
export default AdminDashboard