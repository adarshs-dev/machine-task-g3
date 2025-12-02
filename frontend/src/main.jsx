import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css'

import App from './App.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
// import CreateTask from './pages/CreateTask.jsx';
// import EditTask from './pages/EditTask.jsx';
import TaskDashboard from './pages/Dashboard/TaskDashboard.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>


          <Routes>
            <Route path="/app" element={<App/>}/>
            <Route path="/" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            {/* <Route path="/addtask" element={<CreateTask/>}/> */}
            {/* <Route path="/edittask" element={<EditTask/>}/> */}
            <Route path="/dashboard" element={<TaskDashboard/>}/>
             
            
          </Routes>
          
        </Router>
      
     
    
  </StrictMode>
)
