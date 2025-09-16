import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Login from '../pages/Login'
import UserLayout from '../pages/User/UserLayout'
import AdminLayout from '../pages/Admin/AdminLayout'
import AdminDashboard from '../pages/Admin/AdminDashboard'
import UserDashboard from '../pages/User/UserDashboard'
import Users from '../pages/Admin/Users/Users'
import Sidebar from '../pages/Admin/Sidebar'
import PrivateRoute from './PrivateRoute'
import Topbar from '../pages/Admin/Topbar'
import Reports from '../pages/Admin/Reports/Reports'
import Categories from '@/pages/Admin/Categories/Categories'
import Institutions from '@/pages/Admin/Institutions/Institutions'
import Register from '@/pages/Register'
import Challenges from '../pages/Admin/Challenges/Challenges'

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* USER ROUTES */}
      <Route element={<PrivateRoute allowedRoles={['user']} />}>
        <Route path="/user" element={<UserLayout />}>
          <Route path="dashboard" element={<UserDashboard />} />
        </Route>
      </Route>

      {/* ADMIN ROUTES */}
      <Route element={<PrivateRoute allowedRoles={['admin', 'institution']} />}>
        <Route path="/admin/" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="categories" element={<Categories />} />
          <Route path="reports" element={<Reports mode="all" />} />
          <Route path="sidebar" element={<Sidebar />} />
          <Route path="topbar" element={<Topbar />} />
          <Route path="institutions" element={<Institutions />} />
          <Route path="challenges" element={<Challenges />} />
        </Route>
        {/* INSTITUTIONS ROUTES */}
        <Route path="/institutions" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="categories" element={<Categories />} />
          <Route path="reports" element={<Reports mode="all" />} />
          <Route path="assigned-reports" element={<Reports mode="assigned" />} />
          <Route path="sidebar" element={<Sidebar />} />
          <Route path="topbar" element={<Topbar />} />
          <Route path="institutions" element={<Institutions />} />
          <Route path="challenges" element={<Challenges mode="all" />} />
          <Route path="assigned-challenges" element={<Challenges mode="assigned" />} />
        </Route>

      </Route>
    </Routes>
  )
}

export default AppRoutes
