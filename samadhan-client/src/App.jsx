import { ToastContainer } from 'react-toastify'
//import Register from  './pages/Register/Register'

import { Route,Routes } from 'react-router-dom'
import Login from './pages/Login/Login'





function App() {


  return (
    <div>
       <Routes>
         <Route
          path='/'
          element={<Login />}
        />

         
       </Routes>
     
        <ToastContainer/>
     </div>
  
    
  )
}

export default App
