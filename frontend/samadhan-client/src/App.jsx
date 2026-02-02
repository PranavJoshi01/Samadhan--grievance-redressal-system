import './App.css'
import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import Navbar from './components/Navbar/Navbar'
import ProtectedRoute from './routes/ProtectedRoute'

// Public Pages
import { Home } from './pages/Home/Home'
import Dashboard from './pages/Home/Dashboard'
import Register from './pages/Register/Register'
import Login from './pages/Login/Login'
import SubmitGrievance from './pages/SubmitGrievance/SubmitGrievance'
import GrievanceDetails from './pages/GrievanceDetails/GrievanceDetails'
import Feedback from './pages/Feedback/Feedback'
import Notifications from './pages/Notifications/Notifications'

// Admin Pages
import Admindashboard from './pages/Admin/Admindashboard/Admindashboard'
import ManageAuthority from './pages/Admin/ManageAuthority/ManageAuthority'
import ManageIssues from './pages/Admin/ManageIssue/ManageIssues'   // ✅ FIXED HERE
import AddDepartment from './pages/Admin/Admindashboard/AddDepartment'

// Authority
import AuthorityDashboard from './pages/Authority/AuthorityDashboard'

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* USER ROUTES */}
        <Route path="/user/home" element={<Home />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="raise-grievance" element={<SubmitGrievance />} />
          <Route path="my-grievances" element={<GrievanceDetails />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="feedback" element={<Feedback />} />
        </Route>

        {/* ADMIN ROUTES */}
        <Route element={<ProtectedRoute allowedRoles={['ADMIN']} />}>
          <Route path="/admin/dashboard" element={<Admindashboard />} />
          <Route path="/admin/manage-authority" element={<ManageAuthority />} />
          <Route path="/admin/manage-issues" element={<ManageIssues />} />
          <Route path="/admin/add-department" element={<AddDepartment />} />
        </Route>

        {/* AUTHORITY ROUTE */}
        <Route element={<ProtectedRoute allowedRoles={['AUTHORITY']} />}>
          <Route path="/authority" element={<AuthorityDashboard />} />
        </Route>

        {/* OPTIONAL DIRECT ACCESS */}
        <Route path="/grievanceDetails" element={<GrievanceDetails />} />

        {/* UNAUTHORIZED */}
        <Route path="/unauthorized" element={<h1>Unauthorized Access</h1>} />
      </Routes>

      <ToastContainer />
    </>
  )
}

export default App
