import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Register from './pages/Register/Register';

import { ToastContainer } from 'react-toastify';
import {Route,Routes} from 'react-router-dom';
import SubmitGrievance from './pages/SubmitGrievance/SubmitGrievance';
import Login from './pages/Login/Login';
import GrievanceDetails from './pages/GrievanceDetails/GrievanceDetails';
import ManageAuthority from './pages/Admin/ManageAuthority/ManageAuthority';

import { Home } from './pages/Home/Home';
import Feedback from './pages/Feedback/Feedback';
import Notifications from './pages/Notifications/Notifications';


function App() {
  

  return (
    <>
      <div>
        <Routes>
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
          path='/user/home'
          element={<Home />}
        />
        
        <Route path  = '/feedback' element={<Feedback />} />
        <Route path = '/notifications' element={<Notifications />} />
        </Routes>

       
      
        
        <ToastContainer />
      </div>
    </>
  )
}

export default App
