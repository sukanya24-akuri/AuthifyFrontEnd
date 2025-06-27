import React from 'react'
import {ToastContainer} from "react-toastify";
import { Home } from './pages/Home.jsx';
import { ResetPassword } from './pages/ResetPassword.jsx';
import { Login } from './pages/Login.jsx';
import { Routes, Route } from 'react-router-dom';

import { EmailVerify } from './pages/EmailVerify.jsx';

export const App = () => {
  return (

   <div>
  
    <ToastContainer/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/reset-password" element={<ResetPassword/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/emailverify" element={<EmailVerify/>}/>
    </Routes>
   </div>
  )
  
}
export default App
