import React from 'react'
import { NavLink } from 'react-router-dom';

function Sidebar() {
    return (
        <aside className="w-64 bg-white border-r shadow-sm">
            <div className="p-4 text-xl font-bold">Tiszta Város</div>
            <nav className="flex flex-col px-4">
                <NavLink to="/admin/dashboard" className="py-2">Dashboard</NavLink>
                <NavLink to="/admin/users" className="py-2">Felhasználók</NavLink>
                <NavLink to="/admin/reports" className="py-2">Bejelentések</NavLink>
                <NavLink to="/admin/categories" className="py-2">Kategóriák</NavLink>
                <NavLink to="/admin/institutions" className="py-2">Intézmények</NavLink>
            </nav>
        </aside>
    )
}

export default Sidebar