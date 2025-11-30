import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Navbar from "./components/Navbar/Navbar";

function App() {
  const [count, setCount] = useState(0)

  return (
    <Routes>
      <Route path='/'
      element = {<Navbar/>}
      />
    </Routes>
  )
}

export default App

// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Navbar from "./components/Navbar";

// // Pages (create empty files for now if not done)
// import Home from "./pages/Home";
// import Signup from "./pages/Signup";
// import Login from "./pages/Login";

// function App() {
//   return (
//     <BrowserRouter>
//       {/* Navbar visible on all pages */}
//       <Navbar />

//       {/* Page content */}
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/login" element={<Login />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;
