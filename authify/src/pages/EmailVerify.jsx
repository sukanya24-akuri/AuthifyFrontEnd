import React from 'react'
import { Link } from 'react-router-dom'
import {assets} from '../assets/assets.js'

export const EmailVerify = () => {
  return (
  <div className="email-verify-container d-flex align-items-center justify-content-center vh-100 position-relative"
  style={{backgroundColor:"grey"}}>
    <Link to="/" className="position-absolute top-0 start-0 p-4 align-items-center gap-2 text-decoration-none">
    <img src={assets.logo} alt="logo"  height={32} width={32}/>
    <span className='fs-4 fw-semibold text-light'>Authify</span>
    </Link>
<div className="p-5 rounded-4 shadow bg-white" style={{width:"350px"}}>
  <h4 className="text-center mb-2 fw-bold">
    Email verify Otp
  </h4>
  <p className="text-center text-dark-50 mb-4">
    Enter the 6-digit code sent to your email
  </p>
  <div className="d-flex justify-content-between gap-2 mb-4 text-white-50 ">
    {[...Array(6)].map((_, i)=>(
        <input
        key={i}
         type="text" 
         maxLength={1}
        
        className='form-control text-center fs-4 otp-input'
      />
    ))}
  </div>
  <button className="btn btn-primary w-100 fw-semibold">
    Verify Email
  </button>
</div>
  </div>
  )
}
