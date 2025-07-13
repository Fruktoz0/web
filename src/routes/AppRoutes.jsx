import { Router, Routes, Route } from 'react-router-dom'

import Home from '../pages/Home'
import Login from '../pages/Login'
import UserLayout from '../pages/User/UserLayout'
import AdminLayout from '../pages/Admin/AdminLayout'
import PrivateRoute from './PrivateRoute'

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />

      <Route element={<PrivateRoute allowedRoles={['user']} />}>
        <Route path="/user/*" element={<UserLayout />} />
      </Route>

      <Route element={<PrivateRoute allowedRoles={['admin']} />}>
        <Route path="/admin/*" element={<AdminLayout />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes
