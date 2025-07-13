import { Navigate, Outlet } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { fetchUser } from '../services/authService'

function PrivateRoute({ allowedRoles }) {
  const [status, setStatus] = useState('loading')
  const [userRole, setUserRole] = useState(null)

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token')
      if (!token) return setStatus('unauthorized')

      try {
        const user = await fetchUser(token)
        setUserRole(user.role)
        if (allowedRoles.includes(user.role)) {
          setStatus('authorized')
        } else {
          setStatus('unauthorized')
        }
      } catch {
        setStatus('unauthorized')
      }
    }

    checkAuth()
  }, [allowedRoles])

  if (status === 'loading') return null
  if (status === 'unauthorized') return <Navigate to="/login" />
  return <Outlet />
}

export default PrivateRoute
