import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Register from './pages/Register/Register';

import { ToastContainer } from 'react-toastify';
import {Route,Routes} from 'react-router-dom';
import SubmitGrievance from './pages/SubmitGrievance/SubmitGrievance';

function App() {
  

  return (
    <>
      <div>
        <Routes>
          <Route
          path='register'
          element={<Register />}
        />
       
        </Routes>

        
        <ToastContainer />
      </div>
    </>
  )
}

export default App
