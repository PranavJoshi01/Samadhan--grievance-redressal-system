import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Register from './pages/Register/Register';

import { ToastContainer } from 'react-toastify';
import {Route,Routes} from 'react-router-dom';
import SubmitGrievance from './pages/SubmitGrievance/SubmitGrievance';
import Login from './pages/Login/Login';
import GrievanceDetails from './pages/GrievanceDetails/GrievanceDetails';
import ManageAuthority from './pages/Admin/ManageAuthority/ManageAuthority';
import Admindashboard from './pages/Admin/Admindashboard/Admindashboard';
import ManageIssues from './pages/Admin/ManageIssue/ManageIssues';

import { Home } from './pages/Home/Home';
import Dashboard from './pages/Home/Dashboard';
import Feedback from './pages/Feedback/Feedback';
import Notifications from './pages/Notifications/Notifications';


function App() {
  

  return (
    <>
      <div>
        <Routes>
          <Route
          path='/'
          element={<Home />}
        />
        <Route
          path='/register'
          element={<Register />}
        />
         <Route
          path='/login'
          element={<Login />}
        />
       <Route path='/grievanceDetails'
       element={<GrievanceDetails/>}/>

        <Route path='/manageAuth'
        element={<ManageAuthority/>}/>

        <Route
          path='/admin/dashboard'
          element={<Admindashboard />}
        />

        <Route
          path='/admin/manage-authority'
          element={<ManageAuthority />}
        />

        <Route
          path='/admin/manage-issues'
          element={<ManageIssues />}
        />

        <Route
          path='/user/home'
          element={<Home />}
        >
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='raise-grievance' element={<SubmitGrievance />} />
          <Route path='my-grievances' element={<GrievanceDetails />} />
          <Route path='notifications' element={<Notifications />} />
          <Route path='feedback' element={<Feedback />} />
        </Route>

        </Routes>

       
      
        
        <ToastContainer />
      </div>
    </>
  )
}

export default App
