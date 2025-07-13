import React from 'react'
import { Outlet, Routes, Route } from 'react-router-dom'
import UserDashboard from './UserDashboard'

function UserLayout() {
  return (
     <div className="p-4">
      <h1 className="text-xl font-bold">Felhasználói felület</h1>
     </div>
  )
}

export default UserLayout