import React from 'react'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'

function Topbar() {
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('role')
        console.log('User logged out')
        navigate('/login')
    }

    return (
        <header className="h-16 bg-white border-b px-4 flex items-center justify-between shadow-sm">
            <div className="text-lg font-semibold">Admin Felhasználói felület</div>
            <div>
                {/* Ide jön majd a user ikon, logout stb. */}
                <Button variant="outline" onClick={handleLogout}>Kijelentkezés</Button>
            </div>
        </header>
    )
}

export default Topbar