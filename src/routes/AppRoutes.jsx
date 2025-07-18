import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Login from '../pages/Login'
import UserLayout from '../pages/User/UserLayout'
import AdminLayout from '../pages/Admin/AdminLayout'
import AdminDashboard from '../pages/Admin/AdminDashboard'
import UserDashboard from '../pages/User/UserDashboard'
import Users from '../pages/Admin/Users'
import Sidebar from '../pages/Admin/Sidebar'
import PrivateRoute from './PrivateRoute'
import TopBar from '../pages/Admin/TopBar'
import Reports from '../pages/Admin/Reports'
import Categories from '@/pages/Admin/Categories'
import Institutions from '@/pages/Admin/Institutions'

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />

      {/* USER ROUTES */}
      <Route element={<PrivateRoute allowedRoles={['user']} />}>
        <Route path="/user" element={<UserLayout />}>
          <Route path="dashboard" element={<UserDashboard />} />
        </Route>
      </Route>

      {/* ADMIN ROUTES */}
      <Route element={<PrivateRoute allowedRoles={['admin']} />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="sidebar" element={<Sidebar />} />
          <Route path="topBar" element={<TopBar />} />
          <Route path="reports" element={<Reports />} />
          <Route path="categories" element={<Categories/>} />
          <Route path="institutions" element={<Institutions/>} />
        </Route>
      </Route>
    </Routes>
  )
}

export default AppRoutes
