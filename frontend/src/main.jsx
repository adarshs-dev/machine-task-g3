import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


import UserRegister from './user/register/UserRegister.jsx'
import UserLogin from './user/login/userLogin.jsx' 
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>

<ToastContainer position='top-right' autoClose={3000} theme='dark'/>

          <Routes>
            <Route path="/" element={<App/>}/>
            <Route path="/login" element={<UserLogin />} />
            <Route path="/register" element={<UserRegister />} />
            
          </Routes>
          
        </Router>
      
     
    
  </StrictMode>
)
